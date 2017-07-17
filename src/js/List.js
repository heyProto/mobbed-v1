import React from 'react';
import Modal from '../js/Modal';

class ListCards extends React.Component {
  constructor () {
    super();   
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal(){
    $('.ui.modal').modal('show');  
    let pro = new ProtoEmbed.initFrame('proto-embed-card', "https://dkqrqc7q64awx.cloudfront.net/5c14b258c86e/index.html?ViewCast_Unique_Identifier=354" , "laptop")     
  }

  render() {
    if (this.props.dataJSON.length === 0) {
      return(<h2>No cards to show</h2>)
    } else {
      let cards = this.props.dataJSON.map((card, i) => {
        return(
          <div key={i} className="protograph-card" onClick={this.handleOpenModal}>
            {card.image ? <img className="card-image" src={card.image} width='100%'/> : <div className="empty-card" width='100%'></div>}
            <div className="protograph-gradient">
              <div className="data-card-content">
                <div className="data-card-title">{card.title}</div>
                <div className="data-card-date">{card.date.split(" ")[0].substring(0, 3)} {card.date.split(" ")[1]} {card.date.split(" ")[2]} | {card.state.substring(0, 13)}</div>
              </div>
            </div>
          </div>
        )
      })
      return (
        <div>
          <div className="protograph-card-area">{cards}</div>
          <Modal />
        </div>
      )
    }
  }
}

export default ListCards;