/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import * as AppActions from '../actions/AppActions';

import LoginForm from '../components/LoginForm';
import ProfilePage from '../components/ProfilePage';
import ErrorMessage from '../components/ErrorMessage';

class SteamApp extends Component {
  render() {
    const { profileInfo: { profileInfo }, dispatch } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} id="main">
          <Text style={styles.welcome}>
            Welcome to Red Steam App!
          </Text>
          <Text style={styles.instructions}>Please, fill the input with interesting you Steam ID</Text>
          <LoginForm style={styles.loginForm} submit={actions.submit}/>
          <ProfilePage style={styles.profilePage}/>
          <ErrorMessage style={styles.errorMessage}/> 
        </ScrollView>
      </View>
    );
  }
}

SteamApp.propTypes = {
  profileInfo: PropTypes.object,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    color: '#ffee0a',
    backgroundColor: '#d80000'
  },
  welcome: {
    fontSize: 20,
    color: '#ffee0a',
    textAlign: 'center'
  },
  instructions: {
    fontSize: 16,
    color: '#ffee0a',
    textAlign: 'center'
  }
});

const stateMap = (state) => {
    return {
        profileInfo: state.steamApp
    };
};

export default connect(stateMap)(SteamApp);