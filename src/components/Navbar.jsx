import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link class="navbar-brand" to="/">
          Movies
        </Link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/login">
                Login <span class="sr-only">(current)</span>
              </Link>
            </li>

            <li class="nav-item dropdown"></li>
          </ul>
        </div>
      </nav>
    );
  }
}
