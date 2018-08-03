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
import { submitContent } from '../actions/AppActions';
import { submitGames } from '../actions/AppActions';

export default class LoginForm extends Component {
  render () {
    return (
      <View style={styles.loginForm}>
        <TextInput
          style={styles.loginFormInput} 
          onChangeText={(value) => this.setState({id: value})}
          value={this.state.id}
        />
        <TouchableHighlight style={styles.submit} underlayColor="#ffa200e6" onPress={this.submitLogin}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      id: nextProps.id || '',
      content: nextProps.content || '',
      games: nextProps.games || ''
    }
  }

  submitLogin = (e) => {
    fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + this.props.key + '&steamids=' + this.state.id)
    .then((response) => response.json())
    .then((result) => this.setState({ content: result.response.players[0] }))
    .then(setContent.bind(this));

    fetch('http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' + this.props.key + '&steamid=' + this.state.id + '&include_appinfo=1')
    .then((response) => response.json())
    .then((result) => this.setState({ games: result.response.games }))
    .then(setGames.bind(this));
  }

  inputHandleChange = (e) => {
    this.setState({ id: e.target.value });
  }
}

function setContent() {
  if (this.state.content === undefined) {
    return this.props.submitContent(this.state.id, this.state.content, { profilePageDisp: 'none', profileGamesDisp: 'none', errorMessageDisp: 'flex' });
  } else {
    return this.props.submitContent(this.state.id, this.state.content, { profilePageDisp: 'flex', profileGamesDisp: 'flex', errorMessageDisp: 'none' });
  }
}

function setGames() {
  if (this.state.games === undefined) {
    return this.props.submitGames(this.state.id, this.state.games, { profilePageDisp: 'none', profileGamesDisp: 'none', errorMessageDisp: 'flex' });
  } else {
    return this.props.submitGames(this.state.id, this.state.games, { profilePageDisp: 'flex', profileGamesDisp: 'flex', errorMessageDisp: 'none' });
  }
}

LoginForm.propTypes = {
  submitContent: PropTypes.func,
  submitGames: PropTypes.func,
  key: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.object,
  games: PropTypes.array
}

LoginForm.defaultProps = {
  key: '3B0D316D0F2A33344D0CF605D3BA85A1'
}

const styles = StyleSheet.create({
  loginForm: {
    width: 320,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 20
  },
  loginFormInput: {
    fontFamily: 'Pixel LCD-7',
    fontSize: 14,
    color: '#ffee0a',
    textAlign: 'center', 
    width: 200
  },
  submit: {
    backgroundColor: '#ffee0a',
    width: 200,
    borderRadius: 2,
    padding: 5
  },
  submitText: {
    fontFamily: 'Pixel LCD-7',
    fontSize: 18,
    color:'#d80000',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('RedSteamApp', () => LoginForm);