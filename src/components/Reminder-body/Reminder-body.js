import React from 'react';
import FolderItem from '../Folder-item/Folder-item';
import './r-body.styl';
import FolderDetail from '../Folder-detail/Folder-detail';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ReminderBody extends React.Component {
  render() {
    return (
      <Router>
        <div className="r-body">
          <h1 className="r-title">文件夹</h1>
          <p className="folder-sub-title">KLOUD</p>
            <div>
              <div className="folder-list">
                <Link to={'0'} key={0}>
                  <FolderItem reserved
                              folder={this.props.allFileFolder}
                              editMode={this.props.editMode}
                  />
                </Link>
                <Link to={'-1'} key={-1}>
                  <FolderItem reserved
                              folder={this.props.defaultFolder}
                              editMode={this.props.editMode}
                  />
                </Link>
                { this.props.folders.map((folder) => (
                  <Link to={`${folder.id}`} key={folder.id}>
                    <FolderItem folder={folder}
                                editMode={this.props.editMode}
                                selected={this.props.chosenFolders.includes(folder.id)}
                                selectFolder={this.props.selectFolder}
                                folderClick={this.props.folderClick}
                    />
                  </Link>
                )) }
                <Link to={'-2'} key={-2}>
                  <FolderItem reserved
                              folder={this.props.deletedFiles}
                              editMode={this.props.editMode}
                  />
                </Link>
              </div>
            </div>
          <Route path="/:id" component={FolderDetail}/>
        </div>
      </Router>
    );
  }
}

export default ReminderBody;
