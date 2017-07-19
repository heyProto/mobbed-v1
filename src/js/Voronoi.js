import React from 'react';
import ReactDOM from 'react-dom';
import {voronoi as d3Voronoi} from 'd3-voronoi';
// import Modal from '../js/Modal';
import Util from '../js/Utils';

class Voronoi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipData: this.props.onLoadTooltipData
    }
  }

  handleMouseOver(e, card, name) {
    this.props.circleHover = true;
    if (!this.props.circleClicked) { 
      Util.highlightCircle(name)
    }
  }

  handleOnClick(e, card, name) {
    if (this.props.mode === 'laptop'){
      this.props.handleCircleClicked(true);
      Util.highlightCircle(name)
      let props = this.props;
      $('.ui.modal').modal({
        onHidden: function(e) {
          let element = document.querySelector("#proto-embed-card iframe");
          // console.log(element, "element")
          element.parentNode.removeChild(element);
          props.handleCircleClicked(false);
        }
      }).modal('attach events', '.close').modal('show')  
      let pro = new ProtoEmbed.initFrame('proto-embed-card', "https://dkqrqc7q64awx.cloudfront.net/5c14b258c86e/index.html?ViewCast_Unique_Identifier="+card.view_cast_identifier, "laptop")
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
