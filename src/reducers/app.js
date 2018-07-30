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
  errorMessage: {
    text: 'Incorrect Steam ID! Try again, please.'
  },
  displays: {
    steamAppDisp: 'flex',
    loginFromDisp: 'flex',
    profilePageDisp: 'none',
    errorMessageDisp: 'none'
  }
}

export default function steamApp (state = initialState, action) {

  switch (action.type) {

    case types.SUBMIT_ID:
      return ({
        ...state,
        id: action.id || initialState.id,
        content: action.content || initialState.content,
        displays: action.displays || initialState.displays
      })

    default:
      return state;
  }
}