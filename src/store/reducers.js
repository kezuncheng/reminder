import { combineReducers } from 'redux';
import initialState from './state';

function folders(state = initialState.folders, action) {
  switch (action.type) {
    case 'SET_FOLDERS': {
      return action.payload;
    }
    case 'DELETE_FOLDERS': {
      return state.filter((folder) => !action.payload.includes(folder.id));
    }
    case 'ADD_FOLDER': {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}

function defaultFolder(state = initialState.defaultFolder, action) {
  switch (action.type) {
    case 'ADD_FILES': {
      return {...state, files: [...state.files, ...action.payload]};
    }
    default: {
      return state;
    }
  }
}

function deletedFiles(state = initialState.deletedFiles, action) {
  switch (action.type) {
    case 'ADD_FILES': {
      return {...state, files: [...state.files, action.payload]};
    }
    default: {
      return state;
    }
  }
}

function chosenList(state = initialState.chosenList, action) {
  switch (action.type) {
    case 'CLEAR_LIST': {
      return [];
    }
    case 'TOGGLE_ITEM': {
      if (state.includes(action.payload)) {
        return state.filter((item) => item !== action.payload);
      }
      return [...state, action.payload];
    }
    default: {
      return state;
    }
  }
}

function targetFolder(state = initialState.targetFolder, action) {
  switch (action.type) {
    case 'SET_FOLDER': {
      return action.payload;
    }
    default:
      return state;
  }
}

export default combineReducers({
  folders, defaultFolder, deletedFiles, chosenList, targetFolder
});
