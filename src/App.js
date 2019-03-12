import React, { Component } from 'react';
import './App.styl';

import ReminderHeader from './components/Reminder-header/Reminder-header';
import ReminderFooter from './components/Reminder-footer/Reminder-footer';
import ReminderBody from './components/Reminder-body/Reminder-body';
import AddFolder from './components/AddFolder/AddFolder';
import Store from 'store';

class App extends Component {

  constructor(props) {
    super(props);
    this.updateStorage = this.updateStorage.bind(this);
    this.selectFolder = this.selectFolder.bind(this);
    this.folderClick = this.folderClick.bind(this);
    this.modal = React.createRef();
    this.state = {
      showModal: false,
      folders: [],
      editMode: false,
      chosenFolders: [],
      modalType: 'addFolder',
      onSelectedFolder: '',
    };
  }

  componentWillMount() {
    const folders = Store.get('reminderData');
    if (folders) {
      this.setState({
        folders,
      });
    }
  }

  addFolderRequest() {
    // TODO setState 回调是什么？
    this.setState({
      showModal: true,
      modalType: 'addFolder',
    });
    this.modal.current.focus();
    this.modal.current.clear();
  }

  handleAddFolderOK() {
    const name = this.modal.current.folderName();
    if (this.state.modalType === 'addFolder') {
      this.state.folders.push({
        id: Date.now(),
        name,
        files: [],
      });
      const newFolders = this.state.folders;
      this.setState({
        showModal: false,
        folders: newFolders,
      });
    }
    if (this.state.modalType === 'editFolderName') {
      const folders = this.state.folders;
      const index = folders.findIndex(item => String(item.id) === String(this.state.onSelectedFolder));
      const folder = folders[index];
      folder.name = name;
      folders.splice(index, 1, folder);
      this.setState({
        showModal: false,
        folders,
      });
    }
    this.updateStorage();
  }

  handleAddFolderCancel() {
    this.setState({
      showModal: false,
    });
    this.modal.current.clear();
  }

  toggleEdit() {
    const editMode = !this.state.editMode;
    if (!editMode) {
      this.setState({
        chosenFolders: [],
      });
    }
    this.setState({
      editMode,
    });
  }

  updateStorage() {
    const folders = this.state.folders;
    Store.set('reminderData', folders);
  }

  selectFolder(id) {
    const selectedFolders = this.state.chosenFolders;
    const index = selectedFolders.findIndex(item => item === id);
    if (index >= 0) {
      selectedFolders.splice(index, 1);
    } else {
      selectedFolders.push(id);
    }
    this.setState({
      chosenFolders: selectedFolders,
    });
  }

  folderClick(id) {
    if (this.state.editMode) {
      const folders = this.state.folders;
      const folderIndex = folders.findIndex(folder => folder.id === id);
      const folder = folders[folderIndex];
      this.modal.current.setValue(folder.name);
      this.modal.current.focus();
      this.setState({
        showModal: true,
        modalType: 'editFolderName',
        onSelectedFolder: folder.id,
      });
    }
  }

  deleteFoldersConfirm() {
    this.setState({
      modalType: 'deleteFoldersConfirm',
      showModal: true,
    });
  }

  deleteFolders(deleteAll) {
    if (deleteAll) {
      console.log('全删');
      this.setState({
        showModal: false,
      });
    } else {
      console.log('只删文件夹');
      this.setState({
        showModal: false,
      });
    }
  }

  render() {
    return (
      <>
        <ReminderHeader editRequest={this.toggleEdit.bind(this)} editMode={this.state.editMode}/>
        <ReminderBody folders={ this.state.folders }
                      editMode={this.state.editMode}
                      chosenFolders={this.state.chosenFolders}
                      selectFolder={this.selectFolder}
                      folderClick={this.folderClick}
        />
        <ReminderFooter addFolderRequest={this.addFolderRequest.bind(this)}
                        deleteFoldersRequest={this.deleteFoldersConfirm.bind(this)}
                        editMode={this.state.editMode}
                        chosenFolders={this.state.chosenFolders}
        />
        <AddFolder showModal={this.state.showModal}
                   modalType={this.state.modalType}
                   chosenFolders={this.state.chosenFolders}
                   ref={this.modal}
                   handleAddFolderOK={ this.handleAddFolderOK.bind(this) }
                   handleAddFolderCancel={this.handleAddFolderCancel.bind(this)}
                   deleteRequest={this.deleteFolders.bind(this)}
        />
      </>
    );
  }
}

export default App;
