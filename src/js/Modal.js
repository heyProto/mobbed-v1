import React from 'react';

class Modal extends React.Component {
  constructor () {
    super();   
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  render() {
    return(
      <div id="proto-modal" className="ui modal small">
        <i className="close icon"></i>
        <div className="image content">
          <div id="proto-embed-card"></div>
        </div>
      </div>
    )
  }
}

export default Modal;