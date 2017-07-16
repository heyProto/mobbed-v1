import React from 'react';
import axios from 'axios';
import Filters from '../js/Filters';

export default class ListCards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: undefined
    }
  }

  componentDidMount() {
    axios.get(this.props.dataURL)
      .then(cards_data => {
        this.setState({
          dataJSON: cards_data.data
        });
    });
  }

  render() {
    if (this.state.dataJSON === undefined) {
      return(<div>Loading</div>)
    } else {
      let cards = this.state.dataJSON.map((card, i) => {
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
      return(
        <div className="protograph-container">
          <Filters dataJSON={this.state.dataJSON} />
          <div className="protograph-card-area">{cards}</div>
        </div>
      )
    }
  }
}