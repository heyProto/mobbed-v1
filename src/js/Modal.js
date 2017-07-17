import React from 'react';

class Modal extends React.Component {
  constructor () {
    super();   
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal () {
    $('.ui.modal').modal('hide'); 
    let element = document.querySelector("#proto-embed-card iframe");
    element.parentNode.removeChild(element);
    this.props.handleCircleClicked(false);
  }

  render() {
    return(
      <div className="ui modal small">
        <i className="close icon" onClick={this.handleCloseModal}></i>
        <div className="image content">
          <div id="proto-embed-card"></div>
        </div>
      </div>
    )
  }
}

export default Modal;