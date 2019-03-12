import React from 'react';
import { Modal, Input } from 'antd';
import './add-folder.styl';

class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.folderName = this.folderName.bind(this);
    this.focus = this.focus.bind(this);
    this.clear = this.clear.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setValue = this.setValue.bind(this);
    this.input = React.createRef();
    this.state = {
      folderName: '',
      title: '新建文件夹',
    };
  }

  focus() {
    setTimeout(() => {
      this.input.current.input.focus();
    }, 20);
  }

  clear() {
    setTimeout(() => {
      this.setState({
        folderName: '',
      });
      this.input.current.input.value = '';
    }, 40);
  }

  folderName() {
    return this.state.folderName;
  }

  handleChange(e) {
    const value = e.target.value.trim();
    this.setState({
      folderName: value,
    });
  }

  setTitle(title) {
    this.setState({
      title,
    });
  }

  setValue(val) {
    this.setState({
      folderName: val,
    });
    setTimeout(() => {
      this.input.current.input.value = val;
    }, 40);
  }

  getTitle() {
    const type = this.props.modalType;
    if (type === 'addFolder') return '新建文件夹';
    if (type === 'editFolderName') return '修改文件夹名称';
    return '';
  }

  render() {
    return (
      <Modal
        title={this.getTitle.bind(this)()}
        visible={this.props.showModal}
        onOk={this.props.handleAddFolderOK}
        onCancel={this.props.handleAddFolderCancel}
        okButtonProps={ { 'disabled': this.state.folderName.length === 0 }  }
      >
        <Input placeholder="名称" ref={this.input} onChange={this.handleChange.bind(this)} />
      </Modal>
    );
  }
}

export default AddFolder;

