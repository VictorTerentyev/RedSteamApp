import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import ProfileGamesItem from './ProfileGamesItem';

import { connect } from 'react-redux';

class ProfileGames extends Component {
  render () {
    const { profileGames: { profileGames }, profileGamesDisp: { profileGamesDisp }, dispatch } = this.props;
    return (
      <View style={setStyles(this.props.profileGamesDisp)}>
        <Text style={styles.profileGamesHeader}>Profile games:</Text>
        {Object.values(this.props.profileGames).map(e => {
          return (
            <View style={styles.profileGamesItem}>
              <Image
                style={styles.profileGamesImg}
                source={e.img_logo_url ? {uri: 'http://media.steampowered.com/steamcommunity/public/images/apps/' + e.appid + '/' + e.img_logo_url + '.jpg'} : { uri: '../../assets/images/gameItemBackground.png'}}
              />
              <View style={styles.profileGamesInfo}>
                <Text style={styles.profileGamesText}> {e.name} </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  checkImgUrl(url) {
    return url 
  }
}

ProfileGames.propTypes = {
  profileGames: PropTypes.array,
  profileGamesDisp: PropTypes.string,
  dispatch: PropTypes.func
}

function setStyles(display) {
  const styles = StyleSheet.create({
    profileGames: {
      display: display,
      width: 320,
      alignSelf: 'center'
    }
  });
  return styles.profileGames;
}

const styles = StyleSheet.create({
  profileGamesHeader: {
    fontFamily: 'Pixel LCD-7',
    color: '#ffee0a',
    fontSize: 20,
    marginBottom: 10
  },
  profileGamesText: {
    fontFamily: 'Pixel LCD-7',
    color: '#ffee0a',
    fontSize: 20,
    marginBottom: 10
  },
  profileGamesItem: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    marginBottom: 10
  },
  profileGamesImg: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#ffee0a',
    borderRadius: 2,
    resizeMode: 'contain'
  },
  profileGamesInfo: {
    width: 270,
    marginLeft: 10,
  },
  profileGamesText: {
    fontFamily: 'Pixel LCD-7',
    color: '#ffee0a',
    fontSize: 14,
  }
});

const stateMap = (state) => {
  return {
    profileGames: state.steamApp.games,
    profileGamesDisp: state.steamApp.displays.profileGamesDisp
  };
};

export default connect(stateMap)(ProfileGames);

AppRegistry.registerComponent('RedSteamApp', () => ProfileGames);