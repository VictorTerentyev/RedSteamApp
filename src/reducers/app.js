import * as types from '../constants/ActionTypes';

const initialState = {
  id: '',
  content: {
    avatarfull: '',
    name: '',
    lastlogoff: '',
    timecreated: '',
    profileurl: ''
  },
  games: [],
  errorMessage: {
    text: 'Incorrect Steam ID! Try again, please.'
  },
  displays: {
    steamAppDisp: 'flex',
    loginFromDisp: 'flex',
    profilePageDisp: 'none',
    profileGamesDisp: 'none',
    errorMessageDisp: 'none'
  }
}

export default function steamApp (state = initialState, action) {

  switch (action.type) {

    case types.SUBMIT_CONTENT:
      return ({
        ...state,
        id: action.id || initialState.id,
        content: action.content || initialState.content,
        displays: action.displays || initialState.displays
      })

    case types.SUBMIT_GAMES:
      return ({
        ...state,
        id: action.id || initialState.id,
        games: action.games || initialState.games,
        displays: action.displays || initialState.displays
      })

    default:
      return state;
  }
}