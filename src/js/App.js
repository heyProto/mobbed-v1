import React from 'react';
import axios from 'axios';
import List from '../js/List';
import Map from '../js/Map';
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
      state_ruling_party: [],
      victim_religion: [],
      accused_religion: [],
      does_the_state_criminalise_victims_actions: [],
      ruling_party_value: 'undefined',
      victim_religion_value: 'undefined',
      accused_religion_value: 'undefined',
      criminalise_victims_value: 'undefined'
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
      height: 255,
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
        if (value === ''){
          value = 'Unknown'
        }
        return (
          <tr className='victim_inactive_item' id={`victim-${value}`}>
            <td id={value} key={i} value={value} onClick={(e) => this.handleOnChangeVR(e, value)}>{value}</td>
            <td>{victimReligionStats[i].length}</td>
          </tr>
        )
      })
      let accusedReligionOptions = Object.keys(this.state.accused_religion).map((value, i) => {
        if (value === ''){
          value = 'Unknown'
        };
        return (
          <tr className='accused_inactive_item' id={`accused-${value}`}>
            <td id={value} key={i} value={value} onClick={(e) => this.handleOnChangeAR(e, value)}>{value}</td>
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
        range = this.getDateRange(this.state.filteredJSON);

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

      return (
        <div className="banner-area">
          <div className="filter-area">
            <div className="tap-area" style={first_tap_area_style} onClick={(e) => this.showFilters(e)}>
              Tap here to explore data
            </div>
            <div id="filter-region" className="ui grid" style={styles}>
              <div className="four wide column filter-title">
                <table><tbody>
                  <th className="table-head">Ruling party</th>{rulingPartyOptions}
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
                  <th className="table-head">Victim committed crime?</th>
                  {criminaliseVictimsOptions}
                </tbody></table>
              </div>
            </div>
            <div className="tap-area" style={second_tap_area_style} onClick={(e) => this.hideFilters(e)}>
              Tap here to hide filters
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
                <div className="display-number"><span className="light-text">0</span>36</div>
              </div>
              <div className="display-text">Reports of lynching were reported <br/> under 
                <select className="display-text-dropdown">
                  <option href="data-sexual-harassment.html">Cattle Protection</option>
                  <option href="data-sexual-harassment.html">Sexual Harassment</option>
                  <option href="data-crime.html">criminalise_victims_value</option>
                  <option href="data-witch-hunting.html">Witch Hunting</option>
                  <option href="data-honour-killings.html">Honour Killing</option>
                  <option href="data-other.html">Other</option>
                </select>
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

 // <div className="ui grid filter-section">
 //            <div className="sixteen wide column">
 //              <p className="hint">Filter cards at the bottom by either clicking on the map or using the dropdowns.</p>
 //            </div>
 //            <div className="seven wide column">
 //              <Map dataJSON={this.state.filteredJSON} topoJSON={this.state.topoJSON} chartOptions={this.props.chartOptions} mode={this.props.mode} circleClicked={this.state.circleClicked} handleCircleClicked={this.handleCircleClicked} circleHover={this.state.circleHover}/>
 //            </div>
 //            <div className="nine wide column">
 //              <br/>
 //              {range.startDate === '' ? <h2 className="mob-summary-text">A total of {number_of_incidents} incidents took place.</h2> : <h2 className="mob-summary-text">A total of {number_of_incidents} incidents took place from {range.startDate} until {range.endDate}.</h2>}
 //              <br/>
 //              <br/>
 //              <div className="protograph-filters-container">
 //                <div className="protograph-filters">
 //                  <p>Party in power</p>
 //                  <select
 //                    onChange={(e) => this.handleOnChangeParty(e)}
 //                    value={this.state.ruling_party_value}
 //                  >
 //                    <option value='undefined'>All</option>
 //                    {rulingPartyOptions}
 //                  </select>
 //                </div>
 //                <div className="protograph-filters">
 //                  <p>Victim religion</p>
 //                  <select
 //                    onChange={(e) => this.handleOnChangeVR(e)}
 //                    value={this.state.victim_religion_value}
 //                  >
 //                    <option value="undefined">All</option>
 //                    {victimReligionOptions}
 //                  </select>
 //                </div>
 //                <div className="protograph-filters">
 //                  <p>Accused religion</p>
 //                  <select
 //                    onChange={(e) => this.handleOnChangeAR(e)}
 //                    value={this.state.accused_religion_value}
 //                  >
 //                    <option value="undefined">All</option>
 //                    {accusedReligionOptions}
 //                  </select>
 //                </div>
 //                <div className="protograph-filters">
 //                  <p>Was the victim possibly committing a crime?</p>
 //                  <select
 //                    onChange={(e) => this.handleOnChangeIsCrime(e)}
 //                    value={this.state.criminalise_victims_value}
 //                  >
 //                    <option value="undefined">All</option>
 //                    {criminaliseVictimsOptions}
 //                  </select>
 //                </div>
 //              </div>
 //            </div>
 //          </div>
 //          <div className="sixteen wide column">
 //            <div className="protograph-container">
 //              <List dataJSON={this.state.filteredJSON} handleCircleClicked={this.handleCircleClicked}/>
 //            </div>
 //          </div>
 //        </div>