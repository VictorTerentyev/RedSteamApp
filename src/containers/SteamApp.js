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
  ScrollView,
  Dimensions
} from 'react-native';
import Video from 'react-native-video';
import BackgroundVideo from '../../videos/background.mp4';

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
        <Video
          repeat
          playInBackground
          playWhenInactive
          resizeMode='cover'
          source={BackgroundVideo}
          style={styles.backgroundVideo}
        />
        <ScrollView 
          contentContainerStyle={{
            flexGrow : 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center', 
            width: this.state.screenWidth
          }} 
        >
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

  constructor() {
    super();
    this.state = {
      screenWidth: Dimensions.get('window').width,
    }

    Dimensions.addEventListener('change', () => {
      this.setState({screenWidth: Dimensions.get('window').width});
    })
  }
}

SteamApp.propTypes = {
  profileInfo: PropTypes.object,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d80000'
  },
  welcome: {
    fontFamily: 'Pixel LCD-7',
    fontSize: 18,
    color: '#ffee0a',
    textAlign: 'center',
    marginTop: 20,
    width: 320
  },
  instructions: {
    fontFamily: 'Pixel LCD-7',
    fontSize: 14,
    color: '#ffee0a',
    textAlign: 'center',
    marginTop: 10,
    width: 320
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

const stateMap = (state) => {
    return {
        profileInfo: state.steamApp
    };
};

export default connect(stateMap)(SteamApp);