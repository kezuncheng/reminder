import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './r-header.styl';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <span className="edit right" onClick={this.props.editRequest}>
          {
            this.props.editMode ? '完成' : '编辑'
          }
        </span>
      </div>
    );
  }
}


export default Header;
