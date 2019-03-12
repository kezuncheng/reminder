import React from 'react';
import { Icon } from 'antd';
import './folder-item.styl';

class FolderItem extends React.Component {
  render() {
    return (
      <li className={'folder ' + (this.props.selected ? 'selected' : '')}>
        <div className={ 'delete-folder ' + (this.props.editMode ? '' : 'hide') }>
          <div className="delete-btn" onClick={this.props.selectFolder.bind(this, this.props.folder.id)}>
            {
              this.props.selected &&
              <Icon type="check" style={{ color: 'white' }}/>
            }
          </div>
        </div>
        <div className="folder-name" onClick={this.props.folderClick.bind(this, this.props.folder.id)}>
          { this.props.folder.name }
        </div>
      </li>
    );
  }
}

export default FolderItem;
