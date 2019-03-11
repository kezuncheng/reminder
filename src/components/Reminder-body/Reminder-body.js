import React from 'react';
import './r-body.styl';

class ReminderBody extends React.Component {
  render() {
    return (
      <div className="r-body">
        <h1 className="r-title">文件夹</h1>
        <p className="folder-sub-title">KLOUD</p>
        <ul className="folder-list">
          { this.props.folders.map((folder, index) => (
            <li className="folder" key={ index }>{ folder.name }</li>
          )) }
        </ul>
      </div>
    );
  }
}

export default ReminderBody;
