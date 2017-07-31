import React from 'react';
import axios from 'axios';
import Halogen from 'halogen';
import List from '../js/List';
import Map from '../js/Map';
import TimeBrush from '../js/TimeBrush';
import Utils from '../js/Utils';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: undefined,
      filteredJSON: undefined,
      circleClicked: false,
      circleHover: false,
      height: 0,
      overflow: 'hidden',
      showTapArea: 'block',
      hideTapArea: 'none',
      topoJSON: {},
      category: null,
      menu: [],
      state: [],
      victim_religion: [],
      accused_religion: [],
      police_to_population: [],
      judge_to_population: [],
      menu_value: 'undefined',
      state_value: 'undefined',
      victim_religion_value: 'undefined',
      accused_religion_value: 'undefined',
      police_to_population_value: 'undefined',
      judge_to_population_value: 'undefined',
      year_value: {
        min: 'undefined',
        max: 'undefined'
      }
    }
    this.handleCircleClicked = this.handleCircleClicked.bind(this);
  }

  componentDidMount() {
    const {dataURL, topoURL} = this.props;
    axios.all([axios.get(dataURL), axios.get(topoURL)])
      .then(axios.spread((card, topo) => {
        this.setState({
          dataJSON: card.data,
          filteredJSON: card.data,
          topoJSON: topo.data
        });
        let menu = Utils.groupBy(this.state.dataJSON, 'menu'),
          state = Utils.groupBy(this.state.dataJSON, 'state'),
          victim_religion = Utils.groupBy(this.state.dataJSON, 'victim_religion'),
          accused_religion = Utils.groupBy(this.state.dataJSON, 'accused_religion'),
          police_to_population = Utils.groupBy(this.state.dataJSON, 'police_to_population'),
          judge_to_population = Utils.groupBy(this.state.dataJSON, 'judge_to_population');

        this.setState({
          menu: menu,
          state: state,
          victim_religion: victim_religion,
          accused_religion: accused_religion,
          police_to_population: police_to_population,
          judge_to_population: judge_to_population

        })
    }));
    this.showCounter();
  }

  handleCircleClicked(bool) {
    this.setState({
      circleClicked: bool
    })
  }

  handleOnChangeMenu(e, value) {
    let name = value;
    this.setState((prevState, props) => {
      prevState.menu_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        menu_value: name
      }
    })
    this.highlightItem(value, 'menu_inactive_item', 'menu_active_item', 'menu');
  }

  handleOnChangeState(e, value) {
    let name = value;
    this.setState((prevState, props) => {
      prevState.state_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        state_value: name
      }
    })
    this.highlightItem(value, 'state_inactive_item', 'state_active_item', 'state');
  }

  handleOnChangeVR(e, value) {
    let name = value;
    this.setState((prevState, props) => {
      prevState.victim_religion_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        victim_religion_value: name
      }
    })
    this.highlightItem(value, 'victim_inactive_item', 'victim_active_item', 'victim');
  }

  handleOnChangeAR(e, value) {
    let name = value;
    this.setState((prevState, props) => {
      prevState.accused_religion_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        accused_religion_value: name
      }
    })
    this.highlightItem(value, 'accused_inactive_item', 'accused_active_item', 'accused');
  }

  handleOnChangePolice(e, value) {
    let name = value;
    this.setState((prevState, props) => {
      prevState.police_to_population_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        police_to_population_value: name
      }
    })
    this.highlightItem(value, 'police_inactive_item','police_active_item', 'police');
  }

  handleOnChangeJudge(e, value) {
    let name = value;
    this.setState((prevState, props) => {
      prevState.judge_to_population_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        judge_to_population_value: name
      }
    })
    this.highlightItem(value, 'judge_inactive_item','judge_active_item', 'judge');
  }

  handleReset(e) {
    this.setState({
      filteredJSON: this.state.dataJSON,
      category: null
    })
    $("#range-slider").data('ionRangeSlider').reset()
    if (this.state.menu_value !== 'undefined') {
      document.getElementById('menu-'+this.state.menu_value).className = 'menu_inactive_item';
    }
    if (this.state.state_value !== 'undefined'){
      document.getElementById('state-'+this.state.state_value).className = 'state_inactive_item';
    }
    if (this.state.victim_religion_value !== 'undefined') {
      document.getElementById('victim-'+this.state.victim_religion_value).className = 'victim_inactive_item';
    }
    if (this.state.accused_religion_value !== 'undefined') {
      document.getElementById('accused-'+this.state.accused_religion_value).className = 'accused_inactive_item';
    }
    if (this.state.police_to_population_value !== 'undefined') {
      document.getElementById('police-'+this.state.police_to_population_value).className = 'police_inactive_item';
    }
    if (this.state.judge_to_population_value !== 'undefined') {
      document.getElementById('judge-'+this.state.judge_to_population_value).className = 'judge_inactive_item';
    }
    this.setState({
      menu_value: 'undefined',
      state_value: 'undefined',
      victim_religion_value: 'undefined',
      accused_religion_value: 'undefined',
      police_to_population_value: 'undefined',
      judge_to_population_value: 'undefined',
      year_value: {
        min: 'undefined',
        max: 'undefined'
      }
    })
  }

  highlightItem(value, inactive, active, identifier) {
    let elm = document.getElementsByClassName(active),
      inactiveClass = inactive,
      activeClass = active;
    let i = 0;
    while (i < elm.length) {
      i++;
      elm[0].className = inactiveClass;
    }
    let selectItem = document.getElementById(`${identifier}-${value}`);
    selectItem.className = activeClass;
  }

  checkMenu(val, index, arr){
    if(this === 'undefined') {
      return true;
    }
    return val.menu === this;
  }

  checkState(val, index, arr){
    if(this === 'undefined') {
      return true;
    }
    return val.state === this;
  }

  checkVictimReligion(val, index, arr) {
    if(this === 'undefined') {
      return true;
    }
    return val.victim_religion === this;
  }

  checkAccusedReligion(val, index, arr) {
    if(this === 'undefined') {
      return true;
    }
    return val.accused_religion === this;
  }

  checkPoliceRatio(val, index, arr) {
    if(this === 'undefined') {
      return true;
    }
    return val.police_to_population === this;
  }

  checkJudgeRatio(val, index, arr) {
    if(this === 'undefined') {
      return true;
    }
    return val.judge_to_population === this;
  }

  checkYear (val, index, arr) {
    if(this.min === 'undefined' || this.max === 'undefined') {
      return true;
    }
    let new_date = val.date.slice(-2)
    return new_date > this.min && new_date < this.max;
  }

  getFilteredData(state) {
    let filteredData = this.state.dataJSON
      .filter(this.checkMenu, state.menu_value)
      .filter(this.checkState, state.state_value)
      .filter(this.checkVictimReligion, state.victim_religion_value)
      .filter(this.checkAccusedReligion, state.accused_religion_value)
      .filter(this.checkPoliceRatio, state.police_to_population_value)
      .filter(this.checkJudgeRatio, state.judge_to_population_value)
      .filter(this.checkYear, state.year_value)
    console.log(filteredData, "filteredData")
    return filteredData;
  }

  showFilters() {
    this.setState({
      height: 380,
      overflow: 'auto',
      showTapArea: 'none',
      hideTapArea: 'block'
    })
  }

  hideFilters() {
    this.setState({
      height: 0,
      overflow: 'hidden',
      showTapArea: 'block',
      hideTapArea: 'none'
    })
  }

  showCounter() {
    setTimeout(function(){
      $('.animate-number').each(function () {
        $(this).prop('Counter',0).animate({
          Counter: $(this).text()
        },{
            duration: 2000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
        });
      }); 
    },1000)
  }

  getDateRange(arr) {
    let new_arr = arr.sort(function (a, b) {
      let key1 = new Date(a.date),
        key2 = new Date(b.date);
      if (key1 > key2) {
        return -1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return 1;
      }
    });
    // console.log(new_arr, "new_Arr")
    let startDate, endDate;
    if (new_arr.length === 0) {
      startDate = '';
      endDate = '';
    } else {
      startDate = new_arr[new_arr.length - 1].date;
      endDate = new_arr[0].date;
    }
    
    return {
      startDate: startDate,
      endDate: endDate
    }
  }

  renderLaptop() {
    if (this.state.dataJSON === undefined) {
      let color = '#F02E2E';

      let style = {
        display: '-webkit-flex',
        display: 'flex',
        WebkitFlex: '0 1 auto',
        flex: '0 1 auto',
        WebkitFlexDirection: 'column',
        flexDirection: 'column',
        WebkitFlexGrow: 1,
        flexGrow: 1,
        WebkitFlexShrink: 0,
        flexShrink: 0,
        WebkitFlexBasis: '25%',
        flexBasis: '25%',
        maxWidth: '100%',
        height: '200px',
        WebkitAlignItems: 'center',
        alignItems: 'center',
        WebkitJustifyContent: 'center',
        justifyContent: 'center'
      };
      return(
       <div style={{
          boxSizing: 'border-box',
          display: '-webkit-flex',
          display: 'flex',
          WebkitFlex: '0 1 auto',
          flex: '0 1 auto',
          WebkitFlexDirection: 'row',
          flexDirection: 'row',
          WebkitFlexWrap: 'wrap',
          flexWrap: 'wrap',
        }}>
          <div style={style}><Halogen.RiseLoader color={color}/></div>
        </div>
      )
    } else {
      let menuStats = Object.values(this.state.menu),
        stateStats = Object.values(this.state.state),
        victimReligionStats = Object.values(this.state.victim_religion),
        accusedReligionStats = Object.values(this.state.accused_religion),
        policeRatioStats = Object.values(this.state.police_to_population),
        judgeRatioStats = Object.values(this.state.judge_to_population);

      let that = this;
      let a = $("#range-slider").ionRangeSlider({
        type: "double",
        min: 2010,
        max: 2017,
        onChange: function (data) {       
          let new_min = data.from_pretty.slice(-2),
            new_max = data.to_pretty.slice(-2);
          that.setState((prevState, props) => {
            prevState.year_value = {
              min: new_min,
              max: new_max
            };
            let filteredData = that.getFilteredData(prevState)
            return {
              filteredJSON: filteredData,
              year_value: {
                min: new_min,
                max: new_max
              }
            }
          })
        }
      });

      let menuOptions = Object.keys(this.state.menu).map((value, i) => {
        return (
          <tr className='menu_inactive_item' id={`menu-${value}`}>
            <td id={value} key={i} value={value} onClick={(e) => this.handleOnChangeMenu(e, value)}>{value}</td>
            <td>{menuStats[i].length}</td>
          </tr>
        )
      })

      let stateOptions = Object.keys(this.state.state).map((value, i) => {
        return (
          <tr className='state_inactive_item' id={`state-${value}`}>
            <td id={value} key={i} value={value} onClick={(e) => this.handleOnChangeState(e, value)}>{value}</td>
            <td>{stateStats[i].length}</td>
          </tr>
        )
      })
        
      let victimReligionOptions = Object.keys(this.state.victim_religion).map((value, i) => {
        let name;
        if (value === ''){
          name = 'Unknown'
        } else {
          name = value
        }
        return (
          <tr className='victim_inactive_item' id={`victim-${value}`}>
            <td id={value} key={i} value={value} onClick={(e) => this.handleOnChangeVR(e, value)}>{name}</td>
            <td>{victimReligionStats[i].length}</td>
          </tr>
        )
      })

      let accusedReligionOptions = Object.keys(this.state.accused_religion).map((value, i) => {
        let name;
        if (value === ''){
          name = 'Unknown'
        } else {
          name = value
        }
        return (
          <tr className='accused_inactive_item' id={`accused-${value}`}>
            <td id={value} key={i} value={value} onClick={(e) => this.handleOnChangeAR(e, value)}>{name}</td>
            <td>{accusedReligionStats[i].length}</td>
          </tr>
        )
      })

      let policeRatioOptions = Object.keys(this.state.police_to_population).map((value, i) => {
        return (
          <tr className='police_inactive_item' id={`police-${value}`}>
            <td id={value} key={i} value={value} onClick={(e) => this.handleOnChangePolice(e, value)}>{value}</td>
            <td>{policeRatioStats[i].length}</td>
          </tr>
        )
      })

      let judgeRatioOptions = Object.keys(this.state.judge_to_population).map((value, i) => {
        return (
          <tr className='judge_inactive_item' id={`judge-${value}`}>
            <td id={value} key={i} value={value} onClick={(e) => this.handleOnChangeJudge(e, value)}>{value}</td>
            <td>{judgeRatioStats[i].length}</td>
          </tr>
        )
      })

      let number_of_incidents = this.state.filteredJSON.length,
        range = this.state.filteredJSON,
        number_of_digits = number_of_incidents.toString().length,
        length = range.length - 1,
        start_date = range[length].date,
        end_date = range[0].date;

      let styles = {
        height: this.state.height,
        overflow: this.state.overflow,
        transition: 'ease-in 0.3s'
      };
      let first_tap_area_style = {
        display: this.state.showTapArea
      },
      second_tap_area_style = {
        display: this.state.hideTapArea
      }

      $('.ui.dropdown').dropdown()

      return (
        <div className="banner-area">
          <div className="filter-area">
            <div className="tap-area" style={first_tap_area_style} onClick={(e) => this.showFilters(e)}>
              <span className="arrow-down"></span><div id="tap-me">Tap here to explore data</div><span className="arrow-down"></span>
            </div>
            <div id="filter-region" className="ui grid" style={styles}>
              <div className="four wide column filter-title" style={{height:190, overflow:'scroll'}}>
                <table><tbody>
                  <th className="table-head">State</th>
                  {stateOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Reason</th>
                  {menuOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Victim religion</th>
                  {victimReligionOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Accused religion</th>
                  {accusedReligionOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Police to population ratio</th>
                  {policeRatioOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Judge to population ratio</th>
                  {judgeRatioOptions}
                </tbody></table>
              </div>
            </div>
            <div className="tap-area" style={second_tap_area_style} onClick={(e) => this.hideFilters(e)}>
              <div style={{marginLeft:320, marginRight: 330, display:'inline-block'}}>
                <span className="arrow-up"></span><div id="tap-me">Tap here to hide filters</div><span className="arrow-up"></span>
              </div>
              <button className="ui secondary button reset-all" onClick={(e) => this.handleReset(e)}>Reset</button>
            </div>
          </div>
          <div className="ui grid">
            <div className="six wide column filter-title">
              <div className="count-area">
                <div className="number-background">
                  <div className="single-background"></div>
                  <div className="single-background"></div>
                  <div className="single-background"></div>
                </div>
                <div className="display-number">
                  {number_of_digits !== 3 ? <span className="light-text">0</span>:'' }
                  {number_of_digits === 1 ? <span className="light-text">0</span>:'' }
                  <span className="animate-number">{number_of_incidents}</span>
                </div>
              </div>
              <div className="display-text">Instances of lynching were reported 
                {this.state.category === null ? <br/> : <div>under <span className="display-text-dropdown">{this.state.category}</span></div>}
                from {start_date} to {end_date}
              </div>
              <br/>
              <TimeBrush dataJSON={this.state.filteredJSON}/>
              <div id="range-slider"></div>
            </div>
            <div className="ten wide column filter-title">
              <Map dataJSON={this.state.filteredJSON} topoJSON={this.state.topoJSON} chartOptions={this.props.chartOptions} mode={this.props.mode} circleClicked={this.state.circleClicked} handleCircleClicked={this.handleCircleClicked} circleHover={this.state.circleHover}/>
            </div>
          </div>
          <div className="sixteen wide column">
            <div className="protograph-container">
              <List dataJSON={this.state.filteredJSON} handleCircleClicked={this.handleCircleClicked}/>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
      case 'mobile' :
        return this.renderLaptop();
    }
  }
}

export default App;