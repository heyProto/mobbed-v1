import React from 'react';
import axios from 'axios';
import {scaleLinear as d3ScaleLinear, scaleOrdinal as d3ScaleOrdinal, scaleBand as d3ScaleBand} from 'd3-scale';
import {timeParse as d3TimeParse, timeFormat} from 'd3-time-format';
import {brushX} from 'd3-brush';
import {axisBottom, axisLeft} from 'd3-axis';
import {max as d3Max, extent as d3Extend} from 'd3-array';

class TimeBrush extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: undefined,
      y: undefined,
      sorted_arr: undefined
    }
  }
  componentWillMount() {
    let parseDate = timeFormat("%B %Y");

    let x = d3ScaleBand()
      .rangeRound([0, 300])
      .padding(0.1),
    y = d3ScaleLinear().range([80, 0]);

    let num_incidents = [];
    this.props.dataJSON.map(function (d){
      num_incidents.push(parseDate(new Date(d.date)));
    });

    let count_obj = this.count(num_incidents),
      count = Object.values(count_obj);

    let arr=[], j=0;
    for (let i in count_obj) {
      arr[j] = ({
        "year": i,
        "count": count_obj[i]
      })
      j++
    }
    let sorted_arr = this.sortArray(arr);

    x.domain(sorted_arr.map(function (d){
      return d.year;
    }))
    y.domain([0, d3Max(sorted_arr, function (d) { return d.count })]);

    // let brush = brushX()
    //   .x(x)
    //   .on("brush", this.brushmove)
    //   .on("brushend", this.brushend);

    this.setState({
      x: x,
      y: y,
      sorted_arr: sorted_arr
    })
  }

  count(arr) {
    return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
  }

  sortArray (arr){
    let new_arr = arr.sort(function (a, b) {
      let key1 = new Date(a.year),
        key2 = new Date(b.year);
      if (key1 > key2) {
        return 1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return -1;
      }
    });
    return new_arr;
  }

  brushend() {
    console.log("hey I am brushed")
  }

  brushmove() {
    console.log("I am moved")
  }

  render() {
    const rects = this.state.sorted_arr.map((d, i) => {
      return(
        <rect
          className="bar"
          key={i} 
          x={this.state.x(d.year)}
          y={this.state.y(d.count)}
          width={2.5}
          height={80 - this.state.y(d.count)}
          fill={"#F02E2E"}>
        </rect>
      )
    });
    return (
      <svg className='barchart' height={100} width={'100%'}>
        <g>
          <g className="bar-group">{rects}</g>
          <g className="brush">
            <rect 
              className="background"
              x={0}
              width={300}
              height={100}
              style={{visibility: 'hidden', cursor: 'crosshair'}}
              >
            </rect>
            <rect 
              className="extent"
              x={0}
              width={300}
              height={100}
              >
            </rect>
            <g className="resize e" transform={'translate(50,0)'} style={{cursor: 'ew-resize'}}>
              <rect 
                x={-3}
                width={6}
                height={100}
                style={{visibility:'hidden'}}
                >
              </rect>
              <path 
                transform={"translate(0,50)"}
                d={'M6.123233995736766e-16,-10A10,10 0 0,1 6.123233995736766e-16,10L0,0Z'}
                >
              </path>
            </g>
            <g className="resize w" transform={'translate(100,0)'} style={{cursor: 'ew-resize'}}>
              <rect
                x={-3}
                width={6}
                height={100}
                style={{visibility:'hidden'}}
                >
              </rect>
              <path 
                transform={"translate(0,50)"}
                d={'M6.123233995736766e-16,-10A10,10 0 0,1 6.123233995736766e-16,10L0,0Z'}
                >
              </path>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default TimeBrush;