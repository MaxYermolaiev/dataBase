import React, { Component } from 'react';
import engine from "../../engine/engine";
import './person-details.css';
import Spinner from "../spinner";
import ErrorButton from "../ErrorButton";
export default class PersonDetails extends Component {
state={
  person:null,
  spiner:true
}
Engine = new engine();
componentDidMount() {
this.updatePerson()
}
componentDidUpdate(prevProps){
  if(this.props.personId!==prevProps.personId)
    this.updatePerson()
}
  updatePerson(){
  let {personId:id} = this.props;
  if (!id) return;
   this.Engine.getPerson(id)
       .then((person)=>{
         this.setState({person,spiner:false})
       });
}

  render() {
  if(!this.state.person||this.state.spiner){
    return <Spinner/>
  }
    let {id,name,gender,birthYear,
      eyeColor} = this.state.person;
    return (
      <div className="person-details card">
        <img className="person-image"
             alt="img"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
            <li className="list-group-item">
              <span><ErrorButton/></span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
