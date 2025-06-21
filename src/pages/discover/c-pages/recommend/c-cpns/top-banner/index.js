import React, { memo, useCallback, useEffect, useRef, useState } from 'react'


import { getTopBannerAction } from '../../store/actionCreators'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'


import { Carousel } from 'antd'
import { 
  BannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl
 } from './style'

export default memo(function TopBanner() {

  const [currentIndex, setCurrentIndex] = useState(0)

  const { topBanners } = useSelector(state => ({
    topBanners: state.recommend.get("topBanners")
  }), shallowEqual)

  const dispatch = useDispatch()

  const bannerRef = useRef()

  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])

  const bannerChange = useCallback((from, to) => {
    setCurrentIndex(to)
  }, [])

  const bgImage = topBanners[currentIndex] && topBanners[currentIndex].imageUrl + "?imageView&blur=40x20"

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className='banner wrap-v2'>
        <BannerLeft>
          <Carousel effect='fade' autoplay ref={bannerRef} beforeChange={bannerChange}>
            {
              topBanners.map((item, index) => {
                return (
                  <div className='banner-item' key={item.imageUrl}>
                    <img className='image' src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })
            }
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className='btn left' onClick={e => bannerRef.current.prev()}></button>
          <button className='btn right' onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})
