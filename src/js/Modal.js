import React from 'react';

class Modal extends React.Component {
  render() {
    return(
      <div id="proto-modal" className="ui modal small scrolling content">
        <i className="close icon"></i>
        <div>
          <div id="proto-embed-card"></div>
        </div>
      </div>
    )
  }
}

export default Modal;