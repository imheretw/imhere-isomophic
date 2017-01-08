import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { requestSignIn } from '../../AuthActions';
import { getError } from '../../AuthReducer';
import { connect } from 'react-redux';
import styles from '../Auth.css';

const logo = require('../../../App/logo.png');

export class LoginPage extends Component {
  signIn = () => {
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    if (emailRef.value && passwordRef.value) {
      this.props.dispatch(requestSignIn({
        email: emailRef.value,
        password: passwordRef.value,
      }));
    }
  };

  render() {
    return (
      <div className={styles.wrap}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <div className={`row ${styles['brand-logo']}`}>
                <div className="col-xs-12"><a href="/"><img src={logo} alt="logo" /></a></div>
                <div className={`col-xs-12 ${styles.slogan}`}>Best site</div>
              </div>

              <hr className={styles.colorgraph} />
              {this.props.error && (
                <div className="alert alert-warning alert-dismissable">
                  <strong>{this.props.error.msg}</strong>
                </div>
              )}

              <form id="login-form" acceptCharset="UTF-8" role="form" className={styles['form-signin']}>
                <fieldset>
                  <input className={`${styles.input} form-control email ${styles.middle}`} required placeholder="E-mail" ref="email" type="email" />
                  <input className={`${styles.input} form-control email ${styles.middle}`} required placeholder="密碼" ref="password" type="password" />
                  <br />
                  <button className="btn btn-lg btn-primary btn-block submit-btn" type="button" onClick={this.signIn}>登入</button>
                  <a className="btn btn-block btn-social btn-lg btn-twitter">
                    <i className="fa fa-envelope"></i> E-mail 註冊
                  </a>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    error: getError(state),
  };
}


LoginPage.propTypes = {
  intl: intlShape.isRequired,
  error: PropTypes.shape({
    msg: PropTypes.string.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(injectIntl(LoginPage));
