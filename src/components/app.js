import '../style.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Main from './main_page';
import NewListing from './new_listing';
import NavBar from './nav_bar';
import Login from './login';
import Listing from './listing';
import SignIn from './sign_in';
import SignUp from './sign_up';
import Chat from './chat';

// eventually include frontend for dropdown menu and chat
// need to discuss w/ team where to include

class App extends Component {
  renderPageAndRoutes = () => {
    if (this.props.auth) {
      return (
        <div className="page">
          <div className="top_bar">
            <h1> Sublit </h1>
            <NavBar />
          </div>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/listings/new" component={NewListing} />
            <Route path="/listings/:listingID" component={Listing} />
            <Route path="/chat" component={Chat} />
            <Route render={() => (<div>Listing Not Found </div>)} />
          </Switch>
        </div>
      );
    }
    return (
      <div className="page">
        <div className="top_bar">
          <h1> Sublit </h1>
        </div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    );
  };

  render() {
    return (
      <Router>
        {this.renderPageAndRoutes()}
      </Router>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  auth: reduxState.auth.authenticated,
});

export default connect(mapStateToProps, null)(App);
