import React from 'react';
import ReactDOM from 'react-dom';
import {voronoi as d3Voronoi} from 'd3-voronoi';
import Tooltip from '../js/Tooltip';
import Util from '../js/Utils';

class Voronoi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipData: this.props.onLoadTooltipData
    }
  }

  componentDidUpdate() {
    // console.log(this.props.circleHover, "this.props.circleHover")
    if (this.props.circleHover || this.props.circleClicked) {
      ReactDOM.render(<Tooltip cardData={this.state.tooltipData} height={this.props.height} mode={this.props.mode} handleCircleClicked={this.props.handleCircleClicked}/>, document.getElementById('renderTooltip')) 
    }   
  }

  handleMouseOver(e, card, name) {
    this.props.circleHover = true;
    if (!this.props.circleClicked) { 
      this.setState({
        tooltipData: card
      })
      Util.highlightCircle(name)
    }
  }

  handleOnClick(e, card, name) {
    if (this.props.mode === 'laptop'){
      this.props.handleCircleClicked(true);
      document.getElementById('t-pin').style.display = 'block'
      let allPath = document.querySelectorAll('.voronoiWrapper path');
      Util.highlightCircle(name)
      this.setState({
        tooltipData: card
      })
    }
  }

  render() {
    let projection = this.props.projection,
      voronoi = d3Voronoi()
        .x(function (d){
          return projection([d.lng, d.lat])[0]
        })
        .y(function (d){
          return projection([d.lng, d.lat])[1]
        })
        .size([this.props.width, this.props.height])(this.props.data);

    let polygons = voronoi.polygons(this.props.data),
      cleanVoronoiCells = polygons.clean(undefined);

    let styles = {
      fill: 'none',
      pointerEvents: 'all'
    }
   
    let voronoiPaths = cleanVoronoiCells.map((d, i) => {
      let name = `${d.data.state}-${d.data.area}`
      return(
        <path style={styles}
          d={`M ${d.join("L")} Z`}
          className={`voronoi ${d.data.state}-${d.data.area}`}
          onClick={(e) => this.handleOnClick(e, d.data, name)}
          onMouseMove={(e) => this.handleMouseOver(e, d.data, name)}
          onTouchStart={(e) => this.handleMouseOver(e, d.data, name)}
          >
        </path>
      )
    }) 

    return(
      <g className="voronoiWrapper">{voronoiPaths}</g>
    )
  }
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

export default Voronoi;
