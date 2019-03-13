import React, { Component } from 'react';
import './r-footer.styl';

class ReminderFooter extends Component {

  handleClick() {
    if (this.props.editMode) {
      if (!this.props.chosenFolders.length) return;
      this.props.deleteFoldersRequest();
    } else {
      this.props.addFolderRequest();
    }
  }

  render() {
    return (
      <div className="r-footer">
        <span className={"right footer-add " + ((this.props.editMode && !this.props.chosenFolders.length) ? 'disabled' : '')}
              onClick={this.handleClick.bind(this)}
        >
          {
            this.props.editMode ? "删除" : "新建文件夹"
          }
        </span>
      </div>
    );
  }
}

export default ReminderFooter;
