import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { submit } from '../actions/AppActions';

export default class LoginForm extends Component {
  render () {
    return (
      <View style={styles.loginForm} id="loginForm">
        <TextInput 
          onChangeText={(value) => this.setState({id: value})}
          value={this.state.id}
        />
        <TouchableHighlight id="submitBtn" style={styles.submit} underlayColor="#ffa200e6" onPress={this.submitLogin}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      id: nextProps.id || '',
      content: nextProps.content || ''
    }
  }

  submitLogin = (e) => {
    fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + this.props.key + '&steamids=' + ID)
    .then((response) => response.json())
    .then((result) => this.setState({ content: result.response.players[0] }))
    .then(submitLoginBind.bind(this));
  }

  inputHandleChange = (e) => {
    this.setState({ id: e.target.value });
  }
}

function submitLoginBind() {
  if (this.state.content === undefined) {
    return this.props.submit(this.state.id, this.state.content, { profilePageDisp: 'none', errorMessageDisp: 'flex' });
  } else {
    return this.props.submit(this.state.id, this.state.content, { profilePageDisp: 'flex', errorMessageDisp: 'none' });
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func,
  key: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.object
}

LoginForm.defaultProps = {
  key: '3B0D316D0F2A33344D0CF605D3BA85A1'
}

const ID = '76561198106567256';

const styles = StyleSheet.create({
  loginForm: {
    alignSelf: 'center',
    alignContent: 'center'
  },
  submit: {
    backgroundColor: '#ffee0a',
    width: 200,
    borderRadius: 20
  },
  submitText: {
    fontSize: 20,
    color:'#d80000',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('RedSteamApp', () => LoginForm);