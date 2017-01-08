import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';

export class RegistrationSuccessPage extends Component {
  render() {
    return (
      <h1>Registration succeed!</h1>
    );
  }
}

RegistrationSuccessPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(RegistrationSuccessPage);
