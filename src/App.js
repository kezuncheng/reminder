import React, { Component } from 'react';
import { message } from 'antd';
import './App.styl';

import ReminderHeader from './components/Reminder-header/Reminder-header';
import ReminderFooter from './components/Reminder-footer/Reminder-footer';
import ReminderBody from './components/Reminder-body/Reminder-body';
import AddFolder from './components/AddFolder/AddFolder';

import { connect } from 'react-redux';
import { addFolder } from "./store/actions";

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
      // folders: [],
      defaultFolder: {
        id: -1,
        name: '备忘录',
        files: [],
      },
      deletedFiles: {
        id: -2,
        name: '最近删除',
        files: [],
      },
      editMode: false,
      chosenFolders: [],
      modalType: 'addFolder',
      onSelectedFolder: '',
    };
  }

  componentWillMount() {
    // const folders = Store.get('reminderData');
    const defaultFolder = Store.get('defaultFolder');
    const deletedFiles = Store.get('deletedFiles');
    // if (folders) {
    //   this.setState({
    //     folders,
    //   });
    // }
    if (defaultFolder) {
      this.setState({
        defaultFolder,
      });
    }
    if (deletedFiles) {
      this.setState({
        deletedFiles,
      });
    }
  }

  componentDidMount() {
    const { addFolder } = this.props;
    addFolder({
      id: Date.now(),
      name: '柯尊铖测试用',
      files: []
    });
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
    let deleted = [];
    const deletedFiles = this.state.deletedFiles;
    const defaultFolder = this.state.defaultFolder;

    const chosenFolders = this.state.chosenFolders;
    const folders = this.state.folders;
    const newFolders = folders.filter((folder) => {
      if (chosenFolders.includes(folder.id)) {
        deleted.push(...folder.files);
        return false;
      }
      return true;
    });
    if (deleteAll) {
      deletedFiles.files.push(...deleted);
      Store.set('deletedFiles', deletedFiles);
    } else {
      defaultFolder.files.push(...deleted);
      Store.set('defaultFolder', defaultFolder);
    }
    // TODO setState 是异步？
    this.setState({
      showModal: false,
      folders: newFolders,
      deletedFiles,
      defaultFolder,
      chosenFolders: [],
    }, () => {
      this.updateStorage();
      message.success('删除成功');
    });
  }

  render() {
    let { folders } = this.props;
    const allFileFolder = {
      id: 0,
      name: '所有kLoud',
      files: [],
    };
    folders.forEach((folder) => {
      if (folder.files.length) {
        allFileFolder.files.push(...folder.files);
      }
    });
    return (
      <>
        <ReminderHeader editRequest={this.toggleEdit.bind(this)} editMode={this.state.editMode}/>
        <div className="body">
          <ReminderBody folders={ folders }
                        defaultFolder={this.state.defaultFolder}
                        allFileFolder={allFileFolder}
                        deletedFiles={this.state.deletedFiles}
                        editMode={this.state.editMode}
                        chosenFolders={this.state.chosenFolders}
                        selectFolder={this.selectFolder}
                        folderClick={this.folderClick}
          />
        </div>
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

const mapStateToProps = (state) => {
  return {
    folders: state.folders,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFolder(data) {
      dispatch(addFolder(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
