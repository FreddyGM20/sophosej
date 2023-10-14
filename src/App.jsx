import React, { Component } from "react";
import axios from 'axios';
import {
  BsFillPersonFill,
  BsPinMapFill,
  BsFillTelephoneFill,
} from "react-icons/bs";
import {
  AiOutlineMail,
  AiOutlineCalendar,
  AiOutlineStop,
} from "react-icons/ai";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: "",
      telefono: "",
      cumpleaños: "",
      direccion: "",
      contraseña: "123456789",
      displayText: "",
    };
  }

  fetchRandomUser = () => {
    axios
      .get('https://randomuser.me/api/')
      .then((response) => {
        const userData = response.data.results[0];
        this.setState({
          nombre: `${userData.name.first} ${userData.name.last}`,
          correo: userData.email,
          telefono: userData.phone,
          cumpleaños: userData.dob.date,
          direccion: `${userData.location.street.name} ${userData.location.street.number}`,
          profile: userData.picture.large,
        });
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  };

  handleIconClick = (field) => {
    let displayText = "";

    switch (field) {
      case "nombre":
        displayText = `My name is ${this.state.nombre}`;
        break;
      case "correo":
        displayText = `My email is ${this.state.correo}`;
        break;
      case "cumpleaños":
        displayText = `My birthday is ${this.state.cumpleaños}`;
        break;
      case "direccion":
        displayText = `My address is ${this.state.direccion}`;
        break;
      case "telefono":
        displayText = `My phone is ${this.state.telefono}`;
        break;
      case "contraseña":
        displayText = `My password is ${this.state.contraseña}`;
        break;
      default:
        break;
    }

    this.setState({
      displayText,
    });
  };

  componentDidMount() {
    this.fetchRandomUser();
  }

  render() {
    return (
      <div className="main">
        <div className="backphoto">
          <img src={this.state.profile} alt="" />
        </div>
        <div className="panel">
          <div className="texto">
            <h2 id="text">{this.state.displayText}</h2>
          </div>
          <div className="icon">
            <button onClick={() => this.handleIconClick("nombre")}>
              <BsFillPersonFill className="icono" />
            </button>
            <button onClick={() => this.handleIconClick("correo")}>
              <AiOutlineMail className="icono" />
            </button>
            <button onClick={() => this.handleIconClick("cumpleaños")}>
              <AiOutlineCalendar className="icono" />
            </button>
            <button onClick={() => this.handleIconClick("direccion")}>
              <BsPinMapFill className="icono" />
            </button>
            <button onClick={() => this.handleIconClick("telefono")}>
              <BsFillTelephoneFill className="icono" />
            </button>
            <button onClick={() => this.handleIconClick("contraseña")}>
              <AiOutlineStop className="icono" />
            </button>
          </div>
        </div>
        |
      </div>
    );
  }
}

export default App;
