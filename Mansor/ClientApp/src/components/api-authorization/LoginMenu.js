﻿import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = `${ApplicationPaths.LogOut}`;
      const logoutState = { local: true };
      return this.authenticatedView(userName, profilePath, logoutPath, logoutState);
    }
  }

  authenticatedView(userName, profilePath, logoutPath, logoutState) {
      return (<Fragment>
        <NavItem>
            <NavLink tag={Link} className="text-white" to="/specialities">Специалности</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} className="text-white" to={profilePath}>Профил</NavLink>
        </NavItem>
        <NavItem>
            <NavLink replace tag={Link} className="text-white" to={logoutPath} state={logoutState}>Изход</NavLink>
        </NavItem>
    </Fragment>);
  }

  anonymousView(registerPath, loginPath) {
    return (<Fragment>
      <NavItem>
        <NavLink tag={Link} className="text-white" to={registerPath}>Регистрация</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} className="text-white" to={loginPath}>Вход</NavLink>
      </NavItem>
    </Fragment>);
  }
}
