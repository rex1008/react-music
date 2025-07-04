import React, { memo } from 'react'

import { getSizeImage } from '../../utils/format-utils'
import { getSongDetailAction, changeIsFirstOpenAction } from '../../pages/player/store'

import { TopRankingWrapper } from './style'
import { useDispatch } from 'react-redux'

export default memo(function TopRanking(props) {
  const { info, size = 80 } = props
  const { tracks = []} = info

  const dispatch = useDispatch()

  const playMusic = item => {
    dispatch(getSongDetailAction(item.id))
    dispatch(changeIsFirstOpenAction(false)) // 用户手动点击了按钮，将“是否第一次打开”标志置为false
  }

  return (
    <TopRankingWrapper>
      <div className='header'>
        <div className='image'>
          <img src={getSizeImage(info.coverImgUrl, size)} alt="" />
          <a href="/todo" className='image_cover'>ranking</a>
        </div>
        <div className='info'>
          <a href="/todo">{info.name}</a>
          <div>
            <button className='btn play sprite_02'></button>
            <button className='btn favor sprite_02'></button>
          </div>
        </div>
      </div>
      <div className='list'>
        {
          tracks.slice(0, 10).map((item, index) => {
            return (
              <div key={item.id} className='list-item'>
                <div className='rank'>{index + 1}</div>
                <div className='info'>
                  <div className='name text-nowrap'>{item.name}</div>
                  <div className='operate'>
                    <button className='btn sprite_02 play' onClick={e => playMusic(item)}></button>
                    <button className='btn sprite_icon2 addto'></button>
                    <button className='btn sprite_02 favor'></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='footer'>
        <a href="/todo">查看全部 &gt;</a>
      </div>
    </TopRankingWrapper>
  )
})
