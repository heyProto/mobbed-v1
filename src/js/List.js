import React from 'react';

class ListCards extends React.Component {
  render() {
    if (this.props.dataJSON === undefined) {
      return(<div>Loading</div>)
    } else {
      let cards = this.props.dataJSON.map((card, i) => {
        return(
          <div key={i} className="protograph-card">
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
      return (<div className="protograph-card-area">{cards}</div>)
    }
  }
}

export default ListCards;