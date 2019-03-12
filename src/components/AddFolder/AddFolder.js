import React from 'react';
import { Modal, Input, Button } from 'antd';
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
      if (this.input.current) this.input.current.input.value = '';
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
    if (type === 'deleteFoldersConfirm') return '删除文件夹？';
    return '';
  }

  render() {
    const type = this.props.modalType;
    return (
      <Modal
        title={this.getTitle.bind(this)()}
        visible={this.props.showModal}
        onCancel={this.props.handleAddFolderCancel}
        // okButtonProps={ { 'disabled': this.state.folderName.length === 0 }  }
        footer={type === 'deleteFoldersConfirm' ? [
          <p key="0" className="delete-hint" onClick={this.props.deleteRequest.bind(this, true)}>删除文件夹和备忘录</p>,
          <p key="1" className="delete-hint" onClick={this.props.deleteRequest.bind(this, false)}>仅删除文件夹</p>,
          <p key="2" className="delete-hint cancel" onClick={this.props.handleAddFolderCancel}>取消</p>
        ] :
          [
            <Button key="0" onClick={this.props.handleAddFolderCancel}>取消</Button>,
            <Button key="1" disabled={this.state.folderName.length === 0}
                    onClick={this.props.handleAddFolderOK}
            >确认</Button>
          ]
        }
        className={type === 'deleteFoldersConfirm' ? 'onDelete' : ''}
      >
        {
          type === 'deleteFoldersConfirm' ?
            <p>
              如果仅删除这{ this.props.chosenFolders.length === 1 ? '一' : '些' }文件夹，其备忘录
              将移至“备忘录”文件夹。子文件夹也将同时删除。
            </p> :
            <Input placeholder="名称" ref={this.input} onChange={this.handleChange.bind(this)} />
        }
      </Modal>
    );
  }
}

export default AddFolder;

