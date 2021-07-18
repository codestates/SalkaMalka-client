import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setAlertOpen } from '../actions/index';

require("dotenv").config();


export default function AlertModal() {
  const dispatch = useDispatch();
  const { isAlertOpen, alertMessage } = useSelector(state => state);
  
  return (
    <div className={isAlertOpen ? 'open-alert-modal alert-modal' : 'alert-modal'}>
      <main>
        <div>{alertMessage}</div>
        <button onClick={() => { dispatch(setAlertOpen(false,'')) }}>확인</button>
      </main>
    </div>
  )
}