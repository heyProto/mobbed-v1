import React from 'react';
import { VictoryBar, VictoryChart, VictoryBrushContainer, VictoryAxis} from 'victory';
import axios from 'axios';
import {timeFormat} from 'd3-time-format';

class TimeBrush extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sorted_arr: undefined
    }
  }

   componentWillMount() {
    let parseDate = timeFormat("%b-%Y"),
      width;

    let num_incidents = [];
    this.props.dataJSON.map(function (d){
      num_incidents.push(parseDate(new Date(d.date)));
    });

    let count_obj = this.count(num_incidents),
      count = Object.values(count_obj);

    // console.log(count_obj, "count_obj")
    let arr=[], j=0;
    for (let i in count_obj) {
      arr[j] = ({
        "year": i,
        "date_obj": new Date(i),
        "count": count_obj[i] 
      })
      j++
    }
    let sorted_arr = this.sortArray(arr);

    this.setState({
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

  render() {
    // console.log(this.state.sorted_arr, "this.state.sorted_arr")
    return (
      <VictoryChart 
        domainPadding={10}
        width={300} height={120} padding={{left:0, right: 0, top:10, bottom:50}}
        scale={{x: "time"}}
        containerComponent={
          <VictoryBrushContainer 
            dimension="x" 
            responsive={false}
            onDomainChange={(domain) => this.props.handleSelectDateRange(domain)}/>
        }
      > 
        <VictoryAxis
          fixLabelOverlap={true}
          style={{
            axis: {stroke: "black", strokeWidth: 0.5},
            axisLabel: {fontSize: 10},
            ticks: {stroke: "black", size: 5},
            tickLabels: {fontSize: 10}
          }}/>

        <VictoryBar
          style={{ data: { fill: "#F02E2E" } }}
          padding={{left: 10, right: 10, bottom:50}}
          data={this.state.sorted_arr}
          x="date_obj"
          y="count"/>
      </VictoryChart>
    )
  }
}

// class TimeBrush extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       x: undefined,
//       y: undefined,
//       sorted_arr: undefined
//     }
//   }
//   componentWillMount() {
//     let parseDate = timeFormat("%B'%Y"),
//       width;

//     if (this.props.mode === 'mobile'){
//       width = this.props.dimensionWidth -30
//     } else {
//       width = 300
//     }

//     let x = d3ScaleBand()
//       .rangeRound([0, width])
//       .padding(0.2),
//     y = d3ScaleLinear().range([80, 0]);

//     let num_incidents = [];
//     this.props.dataJSON.map(function (d){
//       num_incidents.push(parseDate(new Date(d.date)));
//     });

//     let count_obj = this.count(num_incidents),
//       count = Object.values(count_obj);

//     // console.log(count_obj, "count_obj")
//     let arr=[], j=0;
//     for (let i in count_obj) {
//       arr[j] = ({
//         "year": i,
//         "count": count_obj[i]
//       })
//       j++
//     }
//     let sorted_arr = this.sortArray(arr);

//     x.domain(sorted_arr.map(function (d){
//       return d.year;
//     }))
//     y.domain([0, d3Max(sorted_arr, function (d) { return d.count })]);

//     this.setState({
//       x: x,
//       y: y,
//       sorted_arr: sorted_arr
//     })
//   }

//   count(arr) {
//     return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
//   }

//   sortArray (arr){
//     let new_arr = arr.sort(function (a, b) {
//       let key1 = new Date(a.year),
//         key2 = new Date(b.year);
//       if (key1 > key2) {
//         return 1;
//       } else if (key1 == key2) {
//         return 0;
//       } else {
//         return -1;
//       }
//     });
//     return new_arr;
//   }

//   render() {
//     const rects = this.state.sorted_arr.map((d, i) => {
//       return(
//         <rect
//           className="bar"
//           key={i} 
//           x={this.state.x(d.year)}
//           y={this.state.y(d.count)}
//           width={this.state.x.bandwidth()}
//           height={80 - this.state.y(d.count)}
//           fill={"#F02E2E"}>
//         </rect>
//       )
//     });
//     let styles;
//     if (this.props.mode === 'laptop'){
//       styles = {
//         left: '18px'
//       }
//     } else {
//       styles = {
//         left: 0
//       }
//     }
//     return (
//       <svg className='barchart' height={100} width={'100%'} style={styles}>
//         <g>
//           <g className="bar-group">{rects}</g>
//         </g>
//       </svg>
//     )
//   }
// }

export default TimeBrush;