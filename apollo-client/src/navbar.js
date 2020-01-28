import React from 'react';
import { Link } from "react-router-dom";
import logo from "./logo.svg";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="#home">
            <img src={logo} className="app-logo" alt="logo" />
            Server is <span className={"badge " + (this.props.status ? "badge-success":"badge-danger")}>{this.props.status ? "Connected":"Disconnected"}</span>
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/post">Post</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
