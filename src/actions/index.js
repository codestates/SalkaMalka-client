// action types
export const SIGNIN = "SIGNIN";
export const SETACCESSTOKEN = "SETACCESSTOKEN";
export const SETQUERYSTRING = "SETQUERYSTRING";
export const SETBOOKMARKS = "SETBOOKMARKS";
export const SETPOSTS = "SETPOSTS";
export const SETCOMMENTS = "SETCOMMENTS";
export const SETCLOSED = "SETCLOSED";
export const SETREPLIED = "SETREPLIED";
export const SETGUIDEOPEN = "SETGUIDEOPEN";
export const SETKING = "SETKING";
export const SETLOADING = "SETLOADING"
export const SETALERTOPEN = "SETALERTOPEN"
export const ISTRIAL = "ISTRIAL"

export const userSignIn = (data) => {
  const { email, userId, accessToken, provider, bookmarks } = data;
  return {
    type: SIGNIN,
    payload: {
      isSignIn: true,
      accessToken: accessToken,
      userId: userId,
      email: email,
      provider: provider,
      bookmarks: bookmarks
    }
  }
}

export const setAccessToken = (accessToken) => {
  return {
    type: SETACCESSTOKEN,
    payload: {
      accessToken: accessToken
    }
  }
}

export const setQueryString = (queryString) => {
  return {
    type: SETQUERYSTRING,
    payload: {
      queryString: queryString
    }
  }
}

export const setBookmarks = (bookmarks) => {
  // console.log(bookmarks)
  return {
    type: SETBOOKMARKS,
    payload: {
      bookmarks: bookmarks
    }
  }
}

export const setPosts = (posts) => {
  return {
    type: SETPOSTS,
    payload: {
      openPosts: posts
    }
  }
}

export const setComments = (comments) => {
  return {
    type: SETCOMMENTS,
    payload: {
      comments: comments
    }
  }
}

export const setClosed = (posts) => {
  return {
    type: SETCLOSED,
    payload: {
      closedPosts: posts
    }
  }
}

export const setReplied = (posts) => {
  return {
    type: SETREPLIED,
    payload: {
      repliedPosts: posts
    }
  }
} 

export const setGuideOpen = (boolean) => {
  return {
    type: SETGUIDEOPEN,
    payload: {
      isGuideOpen: boolean
    }
  }
}

export const setKing = (userId) => {
  return {
    type: SETKING,
    payload: {
      king: userId
    }
  }
}

export const setLoading = (boolean) => {
  return {
    type: SETLOADING,
    payload: {
      isLoading: boolean
    }
  }
}

export const setAlertOpen = (boolean, message) => {
  return {
    type: SETALERTOPEN,
    payload: {
      isAlertOpen: boolean,
      alertMessage : message
    }
  }
}

export const setTrial = (boolean) => {
  return {
    type: SETTRIAL,
    payload: {
      isTrial: boolean
    }
  }
}