import React from 'react';
import axios from 'axios';
import PykQuery from '../../lib/PykQuery.2.0.0.min.js';
import List from '../js/List';

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
      ruling_party_value: 'BJP',
      victim_religion_value: 'Muslim',
      accused_religion_value: 'Hindu',
      criminalise_victims_value: 'No'
    }
  }

  componentDidMount() {
    axios.get(this.props.dataURL)
      .then(cards_data => {
        this.setState({
          dataJSON: cards_data.data,
          filteredJSON: cards_data.data
        });
        PykQuery.PykQuery.createTable("MobTable", "inbrowser", this.state.dataJSON);

        let query = PykQuery.PykQuery.createQuery("query")

        let state_ruling_party_query = PykQuery.PykQuery.createQuery("state_ruling_party_query"),
          state_ruling_party = state_ruling_party_query.select('state_ruling_party').from("MobTable").groupBy().exec();

        let victim_religion_query = PykQuery.PykQuery.createQuery("victim_religion_query"),
          victim_religion = victim_religion_query.select('victim_religion').from("MobTable").groupBy().exec();

        let accused_religion_query = PykQuery.PykQuery.createQuery("accused_religion_query"),
          accused_religion = accused_religion_query.select('accused_religion').from("MobTable").groupBy().exec();

        let does_the_state_criminalise_victims_actions_query = PykQuery.PykQuery.createQuery("does_the_state_criminalise_victims_actions_query"),
          does_the_state_criminalise_victims_actions = does_the_state_criminalise_victims_actions_query.select('does_the_state_criminalise_victims_actions').from("MobTable").groupBy().exec();

        this.setState({
          query: query,
          state_ruling_party: state_ruling_party,
          state_ruling_party_query: state_ruling_party_query,
          victim_religion: victim_religion,
          victim_religion_query: victim_religion_query,
          accused_religion: accused_religion,
          accused_religion_query: accused_religion_query,
          does_the_state_criminalise_victims_actions: does_the_state_criminalise_victims_actions,
          does_the_state_criminalise_victims_actions_query: does_the_state_criminalise_victims_actions_query
        })
    });
  }

  handleOnChangeParty(e) {
    this.setState({
      ruling_party_value: e.target.value
    });
    console.log("onchange value", this.state.ruling_party_value)
    this.getFilteredData()
  }

  handleOnChangeVR(e) {
    this.setState({
      victim_religion_value: e.target.value
    })
    this.getFilteredData()
  }

  handleOnChangeAR(e) {
    this.setState({
      accused_religion_value: e.target.value
    })
    this.getFilteredData()
  }

  handleOnChangeIsCrime(e) {
    this.setState({
      criminalise_victims_value: e.target.value
    })
    this.getFilteredData()
  }

  getFilteredData() {
    let filterd = this.state.query.select().from("MobTable").where("state_ruling_party","equal",this.state.ruling_party_value, "and").where("victim_religion", "equal", this.state.victim_religion_value, "and").where("accused_religion", "equal", this.state.accused_religion_value, "and").where("does_the_state_criminalise_victims_actions", "equal", this.state.criminalise_victims_value).exec();
    console.log(filterd, "filtered data")
    this.setState({
      filteredJSON: filterd
    })
  }

  render() {
    if (this.state.dataJSON === undefined) {
      return(<div></div>)
    } else {
      let rulingPartyOptions = this.state.state_ruling_party.map((value, i) => {
        return (
          <option key={i} value={value.state_ruling_party}>{value.state_ruling_party}</option>
        )
      })
      let victimReligionOptions = this.state.victim_religion.map((value, i) => {
        return (
          <option key={i} value={value.victim_religion}>{value.victim_religion}</option>
        )
      })
      let accusedReligionOptions = this.state.accused_religion.map((value, i) => {
        return (
          <option key={i} value={value.accused_religion}>{value.accused_religion}</option>
        )
      })
      let criminaliseVictimsOptions = this.state.does_the_state_criminalise_victims_actions.map((value, i) => {
        return (
          <option key={i} value={value.does_the_state_criminalise_victims_actions}>{value.does_the_state_criminalise_victims_actions}</option>
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
                {rulingPartyOptions}
              </select>
            </div>
            <div className="protograph-filters">
              <p>Victim religion</p>
              <select
                onChange={(e) => this.handleOnChangeVR(e)}
                value={this.state.victim_religion_value}
              >
                {victimReligionOptions}
              </select>
            </div>
            <div className="protograph-filters">
              <p>Accused religion</p>
              <select
                onChange={(e) => this.handleOnChangeAR(e)}
                value={this.state.accused_religion_value}
              >
                {accusedReligionOptions}
              </select>
            </div>
            <div className="protograph-filters">
              <p>Was the victim possibly committing a crime?</p>
              <select
                onChange={(e) => this.handleOnChangeIsCrime(e)}
                value={this.state.criminalise_victims_value}
              >
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