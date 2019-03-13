import React from 'react';
import { Icon } from 'antd';
import './folder-item.styl';

class FolderItem extends React.Component {
  handleFolderClick(id, e) {
    if (this.props.editMode) e.preventDefault();
    if (this.props.reserved) return;
    this.props.folderClick(id);
  }
  handleDeleteClick(e) {
    if (this.props.editMode) e.preventDefault();
    e.stopPropagation();
    this.props.selectFolder(this.props.folder.id)
  }

  render() {
    return (
      <div className={'folder folder-info ' + (this.props.selected ? 'selected ' : '')
      + (this.props.editMode ? 'editMode ' : '')
      +(this.props.reserved ? 'reserved' : '')} onClick={this.handleFolderClick.bind(this, this.props.folder.id)}>
        {
          !this.props.reserved &&
          <div className={ 'delete-folder'}>
            <div className="delete-btn" onClick={this.handleDeleteClick.bind(this)}>
              {
                this.props.selected &&
                <Icon type="check" style={{ color: 'white' }}/>
              }
            </div>
          </div>
        }
        <div className="folder-name">
          <span>{ this.props.folder.name }</span>
        </div>
        <div className="folder-num">
          <span className="num-text">{ this.props.folder.files.length }</span>
          <span className="num-icon">
          <Icon type="right" style={{ 'color': '#909399' }} />
        </span>
        </div>
      </div>
    );
  }
}

export default FolderItem;
