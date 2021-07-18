import React, { useState } from "react";
import SideBar from "../component/SideBar";
import ImageUpload from "../component/ImageUpload";
import imageCompression from "browser-image-compression";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { setAlertOpen } from '../actions/index';

require("dotenv").config();

export default function WritePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    image: null,
    keyword: ''
  })
  const [imgBase64, setImgBase64] = useState('');
  const { userId, accessToken } = useSelector(state => state);

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const handleImage = (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) setImgBase64(base64.toString());
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setInputs({
        ...inputs,
        image: event.target.files[0]
      });
    }
  }

  const handleSubmit = () => {
    if (inputs.title.length === 0) {
      dispatch(setAlertOpen(true, '제목을 입력해주세요.'))
    }
    else if (inputs.content.length === 0) {
      dispatch(setAlertOpen(true, '왜 사고 싶은지 명확하게 인식하는 것이 좋은 소비의 첫걸음이예요.'))
    }
    else if (inputs.keyword.length === 0) {
      dispatch(setAlertOpen(true, '사고 싶은 물건이 무엇인지 명확하게 인식하는 것이 좋은 소비의 첫걸음이예요.'))
    }
    else {
      if (!inputs.image) {
        const formData = new FormData();
        formData.append("title", inputs.title);
        formData.append("content", inputs.content);
        formData.append("keyword", inputs.keyword);
        formData.append("userId", userId)
        axios
          .post(process.env.REACT_APP_API_ENDPOINT + '/posts', formData)
          .then(res => history.push('/main?sort=date'))
          .catch(e => console.log(e));
        return;
      }
      else {

        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        imageCompression(inputs.image, options)
          .then(res => {
            const reader = new FileReader();
            reader.readAsDataURL(res);
            reader.onloadend = () => {
              const base64data = reader.result;
              axios
                .post(process.env.REACT_APP_API_ENDPOINT + '/posts',
                  handleDataForm(base64data),
                  {
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                  })
                .then(res => history.push('/main?sort=date'))
            }
          })
          .catch(e => console.log(e));
      }
    }
  }

  const handleDataForm = dataURI => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], { type: "image/jpeg" });
    const file = new File([blob], "image.jpg");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", inputs.title);
    formData.append("content", inputs.content);
    formData.append("keyword", inputs.keyword);
    formData.append("userId", userId)
    return formData;
  };

  return (
    <div className={'write-page'}>
      <SideBar></SideBar>
      <div className={'wp-content'}>
        <input
          name='title'
          defaultValue={'제목을 입력하세요'}
          onFocus={(e) => {
            if (e.target.value === e.target.defaultValue) {
              e.target.value = ''
            }
          }}
          onChange={handleChange}
        ></input>
        <textarea
          name='content'
          defaultValue={'내용을 입력하세요'}
          rows="10"
          onFocus={(e) => {
            if (e.target.value === e.target.defaultValue) {
              e.target.value = ''
            }
          }}
          onChange={handleChange}>
        </textarea>

        <input
          name='keyword'
          defaultValue={'사고 싶은 물건의 품명을 입력하세요'}
          onFocus={(e) => {
            if (e.target.value === e.target.defaultValue) {
              e.target.value = ''
            }
          }}
          onChange={handleChange}
        ></input>

        <ImageUpload
          inputs={inputs}
          handleImage={handleImage}
          imgBase64={imgBase64}
        ></ImageUpload>
        <div id='wp-submit' onClick={handleSubmit}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </div>
      </div>
    </div>
  )
}