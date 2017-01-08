import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './MessagePage.css';
import { IndexLink } from 'react-router';

class MessagePage extends Component {
  render() {
    const message = this.props.message;

    return (
      <div>
        {message && (
          <div className={styles.center}>
            <h3>{message.title}</h3>
            <hr className="colorgraph" />
            <h4>{message.msg}</h4>

            <p><IndexLink to="/">回首頁</IndexLink></p>
          </div>
        )}
      </div>
    );
  }
}

MessagePage.propTypes = {
  message: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    message: state.app.message,
  };
}

export default connect(mapStateToProps)(MessagePage);
