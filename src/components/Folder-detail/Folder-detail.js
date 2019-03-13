import React from 'react';
import './folder-detail.styl';

class FolderDetail extends React.Component {
  render() {
    const id = this.props.match.params.id;
    console.log(this.props);
    return (
      <div className={'folder-detail'}>
        <h2>hello, this is folder { id }.</h2>
      </div>
    );
  }
}

export default FolderDetail;
