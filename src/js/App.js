import React from 'react';
import axios from 'axios';
import List from '../js/List';
import Utils from '../js/Utils';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: undefined,
      filteredJSON: undefined,
      state_ruling_party: [],
      victim_religion: [],
      accused_religion: [],
      does_the_state_criminalise_victims_actions: [],
      ruling_party_value: undefined,
      victim_religion_value: undefined,
      accused_religion_value: undefined,
      criminalise_victims_value: undefined
    }
  }

  componentDidMount() {
    axios.get(this.props.dataURL)
      .then(cards_data => {
        this.setState({
          dataJSON: cards_data.data,
          filteredJSON: cards_data.data
        });
        let state_ruling_party = Utils.groupBy(this.state.dataJSON, 'state_ruling_party'),
          victim_religion = Utils.groupBy(this.state.dataJSON, 'victim_religion'),
          accused_religion = Utils.groupBy(this.state.dataJSON, 'victim_religion'),
          does_the_state_criminalise_victims_actions = Utils.groupBy(this.state.dataJSON, 'does_the_state_criminalise_victims_actions');
        
        this.setState({
          state_ruling_party: Object.keys(state_ruling_party),
          victim_religion: Object.keys(victim_religion),
          accused_religion: Object.keys(accused_religion),
          does_the_state_criminalise_victims_actions: Object.keys(does_the_state_criminalise_victims_actions)
        })
        // this.getFilteredData();
    });
  }

  handleOnChangeParty(e) {
    let name = e.target.value;
    this.setState((prevState, props) => {
      prevState.ruling_party_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        ruling_party_value: name
      }
    })
  }

  handleOnChangeVR(e) {
    let name = e.target.value;
    this.setState((prevState, props) => {
      prevState.victim_religion_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        victim_religion_value: name
      }
    })
  }

  handleOnChangeAR(e) {
    let name = e.target.value;
    this.setState((prevState, props) => {
      prevState.accused_religion_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        accused_religion_value: name
      }
    })
  }

  handleOnChangeIsCrime(e) {
    let name = e.target.value;
    this.setState((prevState, props) => {
      prevState.criminalise_victims_value = name;
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        criminalise_victims_value: name
      }
    })
  }

  checkParty(val, index, arr){
    if(this === undefined) {
      return true;
    } 
    return val.state_ruling_party === this;
  }

  checkVictimReligion(val, index, arr) {
    if(this === undefined) {
      return true;
    } 
    return val.victim_religion === this;
  }

  checkAccusedReligion(val, index, arr) {
    if(this === undefined) {
      return true;
    } 
    return val.accused_religion === this;
  }

  checkVictimCriminalised(val, index, arr) {
    if(this === undefined) {
      return true;
    } 
    return val.does_the_state_criminalise_victims_actions === this;
  }

  getFilteredData(state) {
    let filteredData = this.state.dataJSON
      .filter(this.checkParty, state.ruling_party_value)
      .filter(this.checkVictimReligion, state.victim_religion_value)
      .filter(this.checkAccusedReligion, state.accused_religion_value)
      .filter(this.checkVictimCriminalised, state.criminalise_victims_value)
    // console.log(filteredData, "filteredData")
    return filteredData;
  }

  render() {
    if (this.state.dataJSON === undefined) {
      return(<div></div>)
    } else {
      let rulingPartyOptions = this.state.state_ruling_party.map((value, i) => {
        return (
          <option key={i} value={value}>{value}</option>
        )
      })
      let victimReligionOptions = this.state.victim_religion.map((value, i) => {
        return (
          <option key={i} value={value}>{value}</option>
        )
      })
      let accusedReligionOptions = this.state.accused_religion.map((value, i) => {
        return (
          <option key={i} value={value}>{value}</option>
        )
      })
      let criminaliseVictimsOptions = this.state.does_the_state_criminalise_victims_actions.map((value, i) => {
        return (
          <option key={i} value={value}>{value}</option>
        )
      })
      return (
        <div className="protograph-container">
          <div className="protograph-filters-container">
            <div className="protograph-filters">
              <p>Party in power</p>
              <select
                onChange={(e) => this.handleOnChangeParty(e)}
                value={this.state.ruling_party_value}
              >
                <option value='All'>All</option>
                {rulingPartyOptions}
              </select>
            </div>
            <div className="protograph-filters">
              <p>Victim religion</p>
              <select
                onChange={(e) => this.handleOnChangeVR(e)}
                value={this.state.victim_religion_value}
              >
                <option value='All'>All</option>
                {victimReligionOptions}
              </select>
            </div>
            <div className="protograph-filters">
              <p>Accused religion</p>
              <select
                onChange={(e) => this.handleOnChangeAR(e)}
                value={this.state.accused_religion_value}
              >
                <option value='All'>All</option>
                {accusedReligionOptions}
              </select>
            </div>
            <div className="protograph-filters">
              <p>Was the victim possibly committing a crime?</p>
              <select
                onChange={(e) => this.handleOnChangeIsCrime(e)}
                value={this.state.criminalise_victims_value}
              >
                <option value='All'>All</option>
                {criminaliseVictimsOptions}
              </select>
            </div>
          </div>
          <List dataJSON={this.state.filteredJSON}/>
        </div>
      )
    }
  }
}

export default App;