import React from 'react';

class Modal extends React.Component {
  constructor () {
    super();   
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(){
    $('.ui.modal').modal('show');  
    let pro = new ProtoEmbed.initFrame('proto-embed-card', "https://dkqrqc7q64awx.cloudfront.net/5c14b258c86e/index.html?ViewCast_Unique_Identifier=354" , "laptop")     
  }

  handleCloseModal () {
    $('.ui.modal').modal('hide'); 
    let element = document.querySelector("#proto-embed-card iframe");
    element.parentNode.removeChild(element);
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