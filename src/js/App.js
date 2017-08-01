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
      police_prevent_death:[],
      lynching_planned: [],
      criminalise_victims: [], 
      area_classification: [], 
      menu_value: 'undefined',
      state_value: 'undefined',
      victim_religion_value: 'undefined',
      accused_religion_value: 'undefined',
      police_to_population_value: 'undefined',
      judge_to_population_value: 'undefined',
      police_prevent_death_value: 'undefined',
      lynching_planned_value: 'undefined',
      criminalise_victims_value: 'undefined',
      area_classification_value: 'undefined',
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
        let menu = this.sortObject(Utils.groupBy(this.state.dataJSON, 'menu')),
          state = this.sortObject(Utils.groupBy(this.state.dataJSON, 'state')),
          victim_religion = this.sortObject(Utils.groupBy(this.state.dataJSON, 'victim_religion')),
          accused_religion = this.sortObject(Utils.groupBy(this.state.dataJSON, 'accused_religion')),
          police_to_population = this.sortObject(Utils.groupBy(this.state.dataJSON, 'police_to_population')),
          judge_to_population = this.sortObject(Utils.groupBy(this.state.dataJSON, 'judge_to_population')),
          police_prevent_death = this.sortObject(Utils.groupBy(this.state.dataJSON, 'did_the_police_intervene_and_prevent_the_death?')),
          lynching_planned = this.sortObject(Utils.groupBy(this.state.dataJSON, 'how_was_the_lynching_planned')),
          criminalise_victims = this.sortObject(Utils.groupBy(this.state.dataJSON, 'does_the_state_criminalise_victims_actions')),
          area_classification = this.sortObject(Utils.groupBy(this.state.dataJSON, 'area_classification'));

        this.setState({
          menu: menu,
          state: state,
          victim_religion: victim_religion,
          accused_religion: accused_religion,
          police_to_population: police_to_population,
          judge_to_population: judge_to_population,
          police_prevent_death: police_prevent_death,
          lynching_planned: lynching_planned,
          criminalise_victims: criminalise_victims,
          area_classification: area_classification
        })
    }));
    this.showCounter();
  }

  sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        arr.push({
          'key': prop,
          'value': obj[prop].length
        });
      }
    }
    arr.sort(function (a, b) {
      let key1 = a.value,
        key2 = b.value;
      if (key1 > key2) {
        return -1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return 1;
      }
    });
    return arr; // returns array
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

  handleOnChangePolicePrevent(e, value) {
    let name = value;
    this.setState((prevState, props) => {
      prevState.police_prevent_death_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        police_prevent_death_value: name
      }
    })
    this.highlightItem(value, 'police_prevent_inactive_item','police_prevent_active_item', 'police-prevent');
  }

  handleOnChangeLynchingPlanned(e, value) {
    let name = value;
    this.setState((prevState, props) => {
      prevState.lynching_planned_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        lynching_planned_value: name
      }
    })
    this.highlightItem(value, 'lynching_inactive_item','lynching_active_item', 'lynching');
  }

  handleOnChangeCriminaliseVictims(e, value){
    let name = value;
    this.setState((prevState, props) => {
      prevState.criminalise_victims_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        criminalise_victims_value: name
      }
    })
    this.highlightItem(value, 'criminalise_inactive_item','criminalise_active_item', 'criminalise');
  }

  handleOnChangeArea(e, value){
    let name = value;
    this.setState((prevState, props) => {
      prevState.area_classification_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        area_classification_value: name
      }
    })
    this.highlightItem(value, 'area_inactive_item','area_active_item', 'area');
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
    if (this.state.police_prevent_death_value !== 'undefined') {
      document.getElementById('police-prevent-'+this.state.police_prevent_death_value).className = 'police_prevent_inactive_item';
    }
    if (this.state.lynching_planned_value !== 'undefined') {
      document.getElementById('lynching-'+this.state.lynching_planned_value).className = 'lynching_inactive_item';
    }
    if (this.state.criminalise_victims_value !== 'undefined') {
      document.getElementById('criminalise-'+this.state.criminalise_victims_value).className = 'criminalise_inactive_item';
    }
    if (this.state.area_classification_value !== 'undefined') {
      document.getElementById('area-'+this.state.area_classification_value).className = 'area_inactive_item';
    }
    this.setState({
      menu_value: 'undefined',
      state_value: 'undefined',
      victim_religion_value: 'undefined',
      accused_religion_value: 'undefined',
      police_to_population_value: 'undefined',
      judge_to_population_value: 'undefined',
      police_prevent_death_value: 'undefined',
      lynching_planned_value: 'undefined',
      criminalise_victims_value: 'undefined',
      area_classification_value: 'undefined',
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

  checkPolicePrevent(val, index, arr) {
    if(this === 'undefined') {
      return true;
    }
    return val['did_the_police_intervene_and_prevent_the_death?'] === this;
  }

  checkLynchingPlanned(val, index, arr) {
    if(this === 'undefined') {
      return true;
    }
    return val.how_was_the_lynching_planned === this;
  }

  checkCriminaliseVictims(val, index, arr) {
    if(this === 'undefined') {
      return true;
    }
    return val.does_the_state_criminalise_victims_actions === this;
  }

  checkArea(val, index, arr) {
    if(this === 'undefined') {
      return true;
    }
    return val.area_classification === this;
  }

  getFilteredData(state) {
    let filteredData = this.state.dataJSON
      .filter(this.checkMenu, state.menu_value)
      .filter(this.checkState, state.state_value)
      .filter(this.checkVictimReligion, state.victim_religion_value)
      .filter(this.checkAccusedReligion, state.accused_religion_value)
      .filter(this.checkPoliceRatio, state.police_to_population_value)
      .filter(this.checkJudgeRatio, state.judge_to_population_value)
      .filter(this.checkPolicePrevent, state.police_prevent_death_value)
      .filter(this.checkLynchingPlanned, state.lynching_planned_value)
      .filter(this.checkCriminaliseVictims, state.criminalise_victims_value)
      .filter(this.checkArea, state.area_classification_value)
      .filter(this.checkYear, state.year_value)
    // console.log(filteredData, "filteredData")
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
        WebkitFlexBasis: '100%',
        flexBasis: '100%',
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
      // debugger;
      let that = this;
      let a = $("#range-slider").ionRangeSlider({
        type: "double",
        min: 2010,
        max: 2017,
        from: 2010,
        to: 2017,
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
  
      let menuOptions = this.state.menu.map((d, i) => {
        return (
          <tr className='menu_inactive_item' id={`menu-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangeMenu(e, d.key)}>{d.key}</td>
            <td>{d.value}</td>
          </tr>
        )
      })
        
      let stateOptions = this.state.state.map((d, i) => {
        return (
          <tr className='state_inactive_item' id={`state-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangeState(e, d.key)}>{d.key}</td>
            <td>{d.value}</td>
          </tr>
        )
      })
   
      let victimReligionOptions = this.state.victim_religion.map((d, i) => {
        let name;
        if (d.key === ''){
          name = 'Unknown'
        } else {
          name = d.key
        }
        return (
          <tr className='victim_inactive_item' id={`victim-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangeVR(e, d.key)}>{name}</td>
            <td>{d.value}</td>
          </tr>
        )
      })

      let accusedReligionOptions = this.state.accused_religion.map((d, i) => {
        let name;
        if (d.key === ''){
          name = 'Unknown'
        } else {
          name = d.key
        }
        return (
          <tr className='accused_inactive_item' id={`accused-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangeAR(e, d.key)}>{name}</td>
            <td>{d.value}</td>
          </tr>
        )
      })

      let policeRatioOptions = this.state.police_to_population.map((d, i) => {
        return (
          <tr className='police_inactive_item' id={`police-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangePolice(e, d.key)}>{d.key}</td>
            <td>{d.value}</td>
          </tr>
        )
      })
      
      let judgeRatioOptions = this.state.judge_to_population.map((d, i) => {
        return (
          <tr className='judge_inactive_item' id={`judge-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangeJudge(e, d.key)}>{d.key}</td>
            <td>{d.value}</td>
          </tr>
        )
      })

      let policePreventOptions = this.state.police_prevent_death.map((d, i) => {
        return (
          <tr className='police_prevent_inactive_item' id={`police-prevent-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangePolicePrevent(e, d.key)}>{d.key}</td>
            <td>{d.value}</td>
          </tr>
        )
      })
      
      let lynchingOptions = this.state.lynching_planned.map((d, i) => {
        return (
          <tr className='lynching_inactive_item' id={`lynching-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangeLynchingPlanned(e, d.key)}>{d.key}</td>
            <td>{d.value}</td>
          </tr>
        )
      })

      let criminaliseOptions = this.state.criminalise_victims.map((d, i) => {
        return (
          <tr className='criminalise_inactive_item' id={`criminalise-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangeCriminaliseVictims(e, d.key)}>{d.key}</td>
            <td>{d.value}</td>
          </tr>
        )
      })
      
      let areaOptions = this.state.area_classification.map((d, i) => {
        return (
          <tr className='area_inactive_item' id={`area-${d.key}`}>
            <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChangeArea(e, d.key)}>{d.key}</td>
            <td>{d.value}</td>
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
                  <th className="table-head">Reason</th>
                  {menuOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Did the police prevent death?</th>
                  {policePreventOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Was the lynching planned?</th>
                  {lynchingOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">If the allegation on the victim were true, would it be a punishable offence?</th>
                  {criminaliseOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title" style={{height:190, overflow:'scroll'}}>
                <table><tbody>
                  <th className="table-head">State</th>
                  {stateOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Area Type</th>
                  {areaOptions}
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
            </div>
            <div className="tap-area" style={second_tap_area_style} onClick={(e) => this.hideFilters(e)}>
              <div className="tap-area-div">
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
              <TimeBrush dataJSON={this.state.filteredJSON} dimensionWidth={this.props.dimensionWidth} mode={this.props.mode}/>
              <div id="range-slider"></div>
            </div>
            <div className="ten wide column filter-title">
              <Map dataJSON={this.state.filteredJSON} topoJSON={this.state.topoJSON} chartOptions={this.props.chartOptions} mode={this.props.mode} circleClicked={this.state.circleClicked} handleCircleClicked={this.handleCircleClicked} circleHover={this.state.circleHover}/>
            </div>
          </div>
          <div className="sixteen wide column">
            <div className="protograph-container">
              <List dataJSON={this.state.filteredJSON} mode={this.props.mode} handleCircleClicked={this.handleCircleClicked}/>
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