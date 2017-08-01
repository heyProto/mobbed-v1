import React from 'react';
import Modal from '../js/Modal';

class ListCards extends React.Component {
  constructor () {
    super();   
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal(e, card){
    console.log(card, "single card data")    
    // window.location.hash = '#'+ card.view_cast_id
    let props = this.props;
    $('.ui.modal').modal({
      onHidden: function(e) {
        let element = document.querySelector("#proto-embed-card iframe");
        // console.log(element, "element")
        element.parentNode.removeChild(element);
        props.handleCircleClicked(false);
      }
    }).modal('attach events', '.close').modal('show')  
    if (this.props.mode === 'laptop') {
      let pro = new ProtoEmbed.initFrame('proto-embed-card', "https://dwln9tzsi7g07.cloudfront.net/1cc352b8dae0/index.html?view_cast_id="+card.view_cast_id+"&schema_id="+card.schema_id, "laptop")
    } else {
      let pro = new ProtoEmbed.initFrame('proto-embed-card', "https://dwln9tzsi7g07.cloudfront.net/1cc352b8dae0/index.html?view_cast_id="+card.view_cast_id+"&schema_id="+card.schema_id, "mobile")
    }   
  }

  render() {
    if (this.props.dataJSON.length === 0) {
      return(<h2>No cards to show</h2>)
    } else {
      let cards = this.props.dataJSON.map((card, i) => {
        return(
          <div key={i} className="protograph-card" onClick={(e) => this.handleOpenModal(e, card)}>
            {card.image ? <img className="card-image" src={card.image} width='100%'/> : <img className="card-image" src={card.screen_shot_url} width='100%'/>}
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
          <Modal handleCircleClicked={this.props.handleCircleClicked} />
        </div>
      )
    }
  }
}

export default ListCards;