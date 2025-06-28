import { getSongDetail } from '../../../services/player'

import * as actionTypes from './constants'

const changeCurrentSongAction = (currentSong) => {
  console.log("currentSong1", currentSong)
  return {
    type: actionTypes.CHANGE_CURRENT_SONG,
    currentSong
  }
}

export const getSongDetailAction = (ids) => {
  // getSongDetailAction只是返回一个函数，函数的参数又是一个函数，名字叫dispatch，这个dispatch最终会被react-redux调用
  return (dispatch) => {
    getSongDetail(ids).then(res => {
      console.log(res)
      dispatch(changeCurrentSongAction(res.data.songs[0]))
    })
  }
}