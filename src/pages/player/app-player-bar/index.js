import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import { Slider } from 'antd'

import { 
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
 } from './style'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getSongDetailAction } from '../store/actionCreators'
import { getSizeImage, formatMinuteSecond, getPlaySong } from '../../../utils/format-utils'

export default memo(function AppPlayerBar() {

  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChanging, setIsChaning] = useState(false)

  const { currentSong } = useSelector(state => ({
    currentSong: state.player.get("currentSong")
  }), shallowEqual)

  const dispatch = useDispatch()

  const audioRef = useRef()

  useEffect(() => {
    dispatch(getSongDetailAction(167876))
  }, [dispatch ])

  const duration = currentSong.dt || 0
  const showOfDuration = formatMinuteSecond(duration)

  const playMusic = () => {
    audioRef.current.src = getPlaySong(currentSong.id)
    audioRef.current.play()
  }

  const timeUpdate = (e) => {
    console.log(e.target.currentTime)
    setCurrentTime(e.target.currentTime * 1000)
    if (!isChanging) {
      setProgress(currentTime / currentSong.dt * 100)
    }
  }

  const sliderChange = useCallback(value => {
    console.log(value)
    setIsChaning(true)
    setProgress(value)
  }, [])

  const sliderAfterChange = useCallback(value => {
    console.log("aftervalue:", value)
    const ct = value / 100 * duration / 1000
    audioRef.current.currentTime = ct
    setCurrentTime(ct * 1000)
    setIsChaning(false)
  }, [duration])

  return (
    <PlaybarWrapper className='sprite_player'>
      <div className='content wrap-v2'>
        <Control>
          <button className='sprite_player prev'></button>
          <button className='sprite_player play' onClick={e => playMusic()}></button>
          <button className='sprite_player next'></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <a href="/#">
              <img src={currentSong.al && getSizeImage(currentSong.al.picUrl, 35)} alt="" />
            </a>
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
        <Operator>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop" ></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} />
    </PlaybarWrapper>
  )
})
