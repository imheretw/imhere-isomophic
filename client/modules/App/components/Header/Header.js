import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

const logo = require('../../logo.png');

// Import Style
import styles from './Header.css';

export function Header(props) {
  return (
    <header id="top-bar" className="navbar navbar-default navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <IndexLink to="/" className="link navbar-nav"><img className={styles.brand} src={logo} alt="Logo" /></IndexLink>
        </div>
        <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
          <ul className="nav navbar-nav navbar-left">
            <li><Link to="/posts" className="link"><FormattedMessage id="posts" /></Link></li>
          </ul>
          {(props.currentUser &&
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a>{props.currentUser.name}</a>
              </li>
              <li> <a onClick={props.signOut}><FormattedMessage id="auth.signOut" /></a>
              </li>
            </ul>
          )}
          {(!props.currentUser &&
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/login"><FormattedMessage id="auth.signIn" /></Link> </li>
              <li><Link to="/register"><FormattedMessage id="auth.signUp" /></Link></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    currentUser: store.auth.currentUser,
  };
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

export default connect(mapStateToProps)(Header);
