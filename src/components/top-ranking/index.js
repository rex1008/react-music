import React, { memo } from 'react'

import { getSizeImage } from '../../utils/format-utils'

import { TopRankingWrapper } from './style'

import "../../assets/css/temp.css";

export default memo(function TopRanking(props) {
  const { info, size = 80 } = props

  const { tracks = []} = info

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
                    <button className='btn sprite_02 play'></button>
                    <button className='btn sprite_icon2 addto'></button>
                    <button className='btn sprite_02 favor'></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='footer'></div>
    </TopRankingWrapper>
  )
})
