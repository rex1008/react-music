import React, { memo, useEffect, useRef } from 'react'

import { Carousel } from 'antd'

import AlbumCover from './../../../../../../components/album-cover'
import ThemeHeaderRCM from './../../../../../../components/theme-header-rcm'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getNewAlbumAction } from '../../store/actionCreators'

import { AlbumWrapper } from './style'

export default memo(function NewAlbum() {

  const { newAlbums } = useSelector(state => ({
    newAlbums: state.recommend.get("newAlbums")
  }), shallowEqual)

  const dispatch = useDispatch()

  const pageRef = useRef()

  useEffect(() => {
    dispatch(getNewAlbumAction(10))
  }, [dispatch])

  return (
    <AlbumWrapper>
      <ThemeHeaderRCM title="新碟上架"></ThemeHeaderRCM>
      <div className='content'>
        <button className='arrow arrow-left sprite_02' onClick={e => pageRef.current.prev()}></button>
        <div className='album'>
          <Carousel dots={false} ref={pageRef}>
            {
              [0, 1].map(pageIndex => {
                return (
                  <div key={pageIndex} className='page'>
                    {
                      newAlbums.slice(pageIndex * 5, (pageIndex + 1) * 5).map(item => {
                        return <AlbumCover key={item.id} info={item} size={100} width={118} $bgp="-570px" />
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <button className='arrow arrow-right sprite_02' onClick={e => pageRef.current.next()}></button>
      </div>
    </AlbumWrapper>
  )
})
