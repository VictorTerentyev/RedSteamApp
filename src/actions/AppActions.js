import * as types from '../constants/ActionTypes';

export function submitContent (id, content, displays) {
  return {
    type: types.SUBMIT_CONTENT,
    id,
    content,
    displays
  };
}

export function submitGames (id, games, displays) {
  return {
    type: types.SUBMIT_GAMES,
    id,
    games,
    displays
  };
}