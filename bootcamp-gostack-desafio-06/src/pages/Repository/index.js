import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default class Repository extends Component {
  static navigationOptions = ({ navigation }) => ({
    repository: navigation.getParam('repository').html_url,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const { repository } = this.props;

    return (
      <WebView
        source={{ uri: repository.html_url }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
