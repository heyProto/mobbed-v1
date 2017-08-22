import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from '../js/List';

console.log("hey")
class showCards extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mobJusticeDataJSON: undefined,
      articleDataJSON: undefined
    }   
  }

  componentDidMount() {
    debugger;
    console.log(this.props.mobURL)
    axios.all([axios.get(this.props.mobURL), axios.get(this.props.articlesURL)])
      .then(axios.spread((mob, articles) => {
        console.log(mob, articles ," data from axios")
        this.setState({
          mobJusticeDataJSON: mob.data,
          articleDataJSON: articles.data
        });
      }))
  }

  showLatestArticles() {
    this.state.articleDataJSON.map((d,i) => {
      return (
        <div id={`ProtoCard-article+i`} className="ProtoCard-article"></div>
      )
      // new ProtoEmbed.initFrame(document.getElementById("ProtoCard-article"+i), data[i].iframe_url, 'laptop')
    })
  }

  render() {
    console.log("render")
    return (
      <div>
        <div className="five wide column latest-incidents">
          <h4 className="ui header column-header">Incidents</h4>
          <List dataJSON={this.state.mobJusticeDataJSON} mode={this.props.mode} handleCircleClicked={false}/>
        </div>
        <div className="seven wide column">
          <h4 className="ui header column-header">Coverage</h4>
          <div id="display-stories">{this.showLatestArticles()}</div>
        </div>
      </div>
    )
  }
}

export default showCards;