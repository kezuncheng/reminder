import React from 'react';
import FolderItem from '../Folder-item/Folder-item';
import './r-body.styl';

class ReminderBody extends React.Component {
  render() {
    return (
      <div className="r-body">
        <h1 className="r-title">文件夹</h1>
        <p className="folder-sub-title">KLOUD</p>
        <ul className="folder-list">
          { this.props.folders.map((folder) => (
            <FolderItem key={folder.id}
                        folder={folder}
                        editMode={this.props.editMode}
                        selected={this.props.chosenFolders.includes(folder.id)}
                        selectFolder={this.props.selectFolder}
                        folderClick={this.props.folderClick}
            />
            // <li className="folder" key={ index }>{ folder.name }</li>
          )) }
        </ul>
      </div>
    );
  }
}

export default ReminderBody;
