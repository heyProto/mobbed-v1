import React from 'react';
import PykQuery from '../../lib/PykQuery.2.0.0.min.js';

class Filters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state_ruling_party: [],
      victim_religion: [],
      accused_religion: [],
      does_the_state_criminalise_victims_actions: [],
      date: [],
      count_injured: [],
      count_dead:[]
    }
  }

  componentWillMount() {
    PykQuery.PykQuery.createTable("MobTable", "inbrowser", this.props.dataJSON);

    let state_ruling_party_query = PykQuery.PykQuery.createQuery("state_ruling_party_query"),
      state_ruling_party = state_ruling_party_query.select('state_ruling_party').from("MobTable").groupBy().exec();

    let victim_religion_query = PykQuery.PykQuery.createQuery("victim_religion_query"),
      victim_religion = victim_religion_query.select('victim_religion').from("MobTable").groupBy().exec();

    let accused_religion_query = PykQuery.PykQuery.createQuery("accused_religion_query"),
      accused_religion = accused_religion_query.select('accused_religion').from("MobTable").groupBy().exec();

    let does_the_state_criminalise_victims_actions_query = PykQuery.PykQuery.createQuery("does_the_state_criminalise_victims_actions_query"),
      does_the_state_criminalise_victims_actions = does_the_state_criminalise_victims_actions_query.select('does_the_state_criminalise_victims_actions').from("MobTable").groupBy().exec();

    this.setState({
      state_ruling_party: state_ruling_party,
      victim_religion: victim_religion,
      accused_religion: accused_religion,
      does_the_state_criminalise_victims_actions: does_the_state_criminalise_victims_actions
    })
  }

  handleOnChange(e, value) {
    console.log(value, "onchange value")
  }

  render() {
    console.log(this.props.dataJSON,"this.props.dataJSON")
    if (this.props.dataJSON === undefined) {
      return(<div></div>)
    } else {
      let rulingPartyOptions = this.state.state_ruling_party.map((value, i) => {
        return (
          <option key={i}>{value.state_ruling_party}</option>
        )
      })
      let victimReligionOptions = this.state.victim_religion.map((value, i) => {
        return (
          <option key={i}>{value.victim_religion}</option>
        )
      })
      let accusedReligionOptions = this.state.accused_religion.map((value, i) => {
        return (
          <option key={i}>{value.accused_religion}</option>
        )
      })
      let criminaliseVictimsOptions = this.state.does_the_state_criminalise_victims_actions.map((value, i) => {
        return (
          <option key={i}>{value.does_the_state_criminalise_victims_actions}</option>
        )
      })
      return (
        <div className="protograph-filters-container">
          <div className="protograph-filters">
            <p>Party in power</p>
            <select>{rulingPartyOptions}</select>
          </div>
          <div className="protograph-filters">
            <p>Victim religion</p>
            <select>{victimReligionOptions}</select>
          </div>
          <div className="protograph-filters">
            <p>Accused religion</p>
            <select>{accusedReligionOptions}</select>
          </div>
          <div className="protograph-filters">
            <p>Was the victim possibly committing a crime?</p>
            <select>{criminaliseVictimsOptions}</select>
          </div>
        </div>
      )
    }
  }
}

export default Filters;