import React from 'react';
import axios from 'axios';
import List from '../js/List';
import Map from '../js/Map';
import Utils from '../js/Utils';

class App extends React.Component {
  constructor(props) {
    super(props)
    console.log(location.href, "window.location.href")
    let url = location.href,
      file_name = url.split('/').pop(),
      category;
    if (file_name === 'data.html'){
      category = 'Crime'
    } else if(file_name === 'data-cattle-protection.html') {
      category = 'Cattle Protection'
    } else if (file_name === 'data-honour-killings.html') {
      category = 'Honour Killing'
    } else if (file_name === 'data-other.html'){
      category = 'Other'
    } else if (file_name === 'data-sexual-harassment.html') {
      category = 'Sexual Harassment'
    } else if (file_name === 'data-witch-hunting.html') {
      category = 'Witch Hunting'
    }
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
      state_ruling_party: [],
      victim_religion: [],
      accused_religion: [],
      does_the_state_criminalise_victims_actions: [],
      ruling_party_value: 'undefined',
      victim_religion_value: 'undefined',
      accused_religion_value: 'undefined',
      criminalise_victims_value: 'undefined',
      category: category
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
        let state_ruling_party = Utils.groupBy(this.state.dataJSON, 'state_ruling_party'),
          victim_religion = Utils.groupBy(this.state.dataJSON, 'victim_religion'),
          accused_religion = Utils.groupBy(this.state.dataJSON, 'victim_religion'),
          does_the_state_criminalise_victims_actions = Utils.groupBy(this.state.dataJSON, 'does_the_state_criminalise_victims_actions');

        this.setState({
          state_ruling_party: state_ruling_party,
          victim_religion: victim_religion,
          accused_religion: accused_religion,
          does_the_state_criminalise_victims_actions: does_the_state_criminalise_victims_actions
        })
    }));
    this.showCounter();
  }

  handleCircleClicked(bool) {
    this.setState({
      circleClicked: bool
    })
  }

  handleOnChangeParty(e, value) {
    let name = value;
    this.setState((prevState, props) => {
      prevState.ruling_party_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        ruling_party_value: name
      }
    })
    this.highlightItem(value, 'party_inactive_item', 'party_active_item', 'party');
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

  handleOnChangeIsCrime(e, value) {
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

  highlightItem(value, inactive, active, identifier) {
    let elm = document.getElementsByClassName(active),
      inactiveClass = inactive,
      activeClass = active;
    let i = 0;
    console.log(elm, "element")
    while (i < elm.length) {
      i++;
      elm[0].className = inactiveClass;
    }
    let selectItem = document.getElementById(`${identifier}-${value}`);
    selectItem.className = activeClass;
  }

  checkParty(val, index, arr){
    if(this === 'undefined') {
      return true;
    }
    return val.state_ruling_party === this;
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

  checkVictimCriminalised(val, index, arr) {
    if(this === 'undefined') {
      return true;
    }
    return val.does_the_state_criminalise_victims_actions === this;
  }

  getFilteredData(state) {
    // console.log(state.victim_religion_value, "state.victim_religion_value")
    let filteredData = this.state.dataJSON
      .filter(this.checkParty, state.ruling_party_value)
      .filter(this.checkVictimReligion, state.victim_religion_value)
      .filter(this.checkAccusedReligion, state.accused_religion_value)
      .filter(this.checkVictimCriminalised, state.criminalise_victims_value)
    console.log(filteredData, "filteredData")
    return filteredData;
  }

  showFilters() {
    this.setState({
      height: 200,
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

  handleCategory(e) {
    let href_val = e.target.value
    window.location.href = href_val
  }

  renderLaptop() {
    if (this.state.dataJSON === undefined) {
      return(<div></div>)
    } else {
      let partyStats = Object.values(this.state.state_ruling_party),
        victimReligionStats = Object.values(this.state.victim_religion),
        accusedReligionStats = Object.values(this.state.victim_religion),
        crimaliseVictimsStats = Object.values(this.state.does_the_state_criminalise_victims_actions);

      let rulingPartyOptions = Object.keys(this.state.state_ruling_party).map((value, i) => { 
        return (
          <tr className='party_inactive_item' id={`party-${value}`}>
            <td key={i} value={value} onClick={(e) => this.handleOnChangeParty(e, value)}>{value}</td>
            <td>{partyStats[i].length}</td>
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
      let criminaliseVictimsOptions = Object.keys(this.state.does_the_state_criminalise_victims_actions).map((value, i) => {
        return (
          <tr className='criminalise_inactive_item' id={`criminalise-${value}`}>
            <td id={value} key={i} value={value} onClick={(e) => this.handleOnChangeIsCrime(e, value)}>{value}</td>
            <td>{crimaliseVictimsStats[i].length}</td>
          </tr>
        )
      })
      let number_of_incidents = this.state.filteredJSON.length,
        range = this.getDateRange(this.state.filteredJSON),
        number_of_digits = number_of_incidents.toString().length;

      console.log(number_of_incidents.toString(), number_of_incidents.toString().length, "number_of_incidents")

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
              <span className="arrow-up"></span><div id="tap-me">Tap here to explore data</div><span className="arrow-up"></span>
            </div>
            <div id="filter-region" className="ui grid" style={styles}>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Accused religion</th>
                  {accusedReligionOptions}
                </tbody></table>
              </div>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Victim committed crime?</th>
                  {criminaliseVictimsOptions}
                </tbody></table>
              </div>
            </div>
            <div className="tap-area" style={second_tap_area_style} onClick={(e) => this.hideFilters(e)}>
              <span className="arrow-down"></span><div id="tap-me">Tap here to hide filters</div><span className="arrow-down"></span>
            </div>
          </div>
          <div className="ui grid">
            <div className="eight wide column filter-title">
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
              <div className="display-text">Reports of lynching were reported <br/> under 
                <div className="ui selection dropdown display-text-dropdown">
                  <input type="hidden" name="category"/>
                  <i className="dropdown icon"></i>
                  <div className="default text def-option">{this.state.category}</div>
                  <div className="menu">
                    <a className="item" href="data-cattle-protection.html">Cattle Protection</a>
                    <a className="item" href="data-sexual-harassment.html">Sexual Harassment</a>
                    <a className="item" href="data.html">Crime</a>
                    <a className="item" href="data-witch-hunting.html">Witch Hunting</a>
                    <a className="item" href="data-honour-killings.html">Honour Killing</a>
                    <a className="item" href="data-other.html">Other</a>
                  </div>
                </div>
                <br/> from {range.startDate} to {range.endDate}</div>
            </div>
            <div className="eight wide column filter-title">
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

  // <select className="display-text-dropdown" onChange={(e) => this.handleCategory(e)}>
  //   <option value="data.html">Cattle Protection</option>
  //   <option value="data-sexual-harassment.html">Sexual Harassment</option>
  //   <option value="data-crime.html">Crime</option>
  //   <option value="data-witch-hunting.html">Witch Hunting</option>
  //   <option value="data-honour-killings.html">Honour Killing</option>
  //   <option value="data-other.html">Other</option>
  // </select> 

  // <div className="four wide column filter-title">
  //   <table><tbody>
  //     <th className="table-head">Ruling party</th>{rulingPartyOptions}
  //   </tbody></table>
  // </div>
  // <div className="four wide column filter-title">
  //   <table><tbody>
  //     <th className="table-head">Victim religion</th>
  //     {victimReligionOptions}
  //   </tbody></table>
  // </div>
                