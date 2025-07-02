import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import { Slider } from 'antd'

import { 
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
 } from './style'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { 
  getSongDetailAction,
  changePlayStrategyAction,
  switchSongAction
} from '../store/actionCreators'
import { getSizeImage, formatMinuteSecond, getPlaySong } from '../../../utils/format-utils'
import { NavLink } from 'react-router-dom'

export default memo(function AppPlayerBar() {

  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChanging, setIsChaning] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const { currentSong, playStrategy } = useSelector(state => ({
    currentSong: state.player.get("currentSong"),
    playStrategy: state.player.get("playStrategy")
  }), shallowEqual)

  const dispatch = useDispatch()

  const audioRef = useRef()

  useEffect(() => {
    dispatch(getSongDetailAction(2720118279))
  }, [dispatch ])

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id)
    audioRef.current.play().then(res => {
      setIsPlaying(true)
    }).catch(err => {
      setIsPlaying(false)
    })
  }, [currentSong])

  const duration = currentSong.dt || 0
  const showOfDuration = formatMinuteSecond(duration)

  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const timeUpdate = (e) => {
    if (!isChanging) {
      setCurrentTime(e.target.currentTime * 1000)
      setProgress(currentTime / currentSong.dt * 100)
    }
  }
  
  const handleMusicEnded = (e) => {
    if (playStrategy === 2) { // 单曲循环
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      switchSong(1) // 顺序播放和随机播放策略下，直接下一首即可
    }
  }

  const changePlayStrategy = () => {
    let nextPlayStrategy = playStrategy + 1
    if (nextPlayStrategy > 2) {
      nextPlayStrategy = 0
    }
    dispatch(changePlayStrategyAction(nextPlayStrategy))
  }

  const switchSong = tag => {
    dispatch(switchSongAction(tag))
  }

  const sliderChange = useCallback(value => {
    setIsChaning(true)
    const ct = value / 100 * duration
    setCurrentTime(ct)
    setProgress(value)
  }, [duration])

  const sliderAfterChange = useCallback(value => {
    const ct = value / 100 * duration / 1000
    audioRef.current.currentTime = ct
    setCurrentTime(ct * 1000)
    setIsChaning(false)

    if (!isPlaying) {
      playMusic()
    }
  }, [duration, isPlaying, playMusic])

  return (
    <PlaybarWrapper className='sprite_player'>
      <div className='content wrap-v2'>
        <Control $isplaying={isPlaying}>
          <button className='sprite_player prev' onClick={e => switchSong(-1)}></button>
          <button className='sprite_player play' onClick={e => playMusic()}></button>
          <button className='sprite_player next' onClick={e => switchSong(1)}></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <NavLink to="/discover/player">
              <img src={currentSong.al && getSizeImage(currentSong.al.picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className='info'>
            <div className='song'>
              <span className='song-name'>{currentSong.name}</span>
              <a href='/#' className='singer-name'>{currentSong.ar && currentSong.ar[0].name}</a>
            </div>
            <div className='progress'>
              <Slider 
                defaultValue={30} 
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange} />
              <div className='time'>
                <span className='now-time'>{formatMinuteSecond(currentTime)}</span>
                <span className='divider'>/</span>
                <span className='duration'>{showOfDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator playstrategy={playStrategy}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop" onClick={e => changePlayStrategy()}></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={e => timeUpdate(e)} onEnded={e => handleMusicEnded()} />
    </PlaybarWrapper>
  )
})
