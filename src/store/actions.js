export function setFolders(data) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_FOLDERS',
      payload: data,
    });
  }
}

export function deleteFolders(data) {
  return (dispatch, getState) => {
    dispatch({
      type: 'DELETE_FOLDERS',
      payload: data,
    });
  }
}

export function addFolder(data) {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_FOLDER',
      payload: data,
    });
  }
}
