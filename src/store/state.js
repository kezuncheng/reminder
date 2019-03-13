import Store from 'store';

const folders = Store.get('reminderData');
const defaultFolder = Store.get('defaultFolder');
const deletedFiles = Store.get('deletedFiles');

export default {
  folders,
  defaultFolder,
  deletedFiles,
  chosenList: [],
  targetFolder: ''
}
