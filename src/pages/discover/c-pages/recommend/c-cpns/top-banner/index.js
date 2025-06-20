import React, { memo, useEffect } from 'react'


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
  const { topBanners } = useSelector(state => ({
    topBanners: state.recommend.get("topBanners")
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])

  return (
    <BannerWrapper>
      <div className='banner wrap-v2'>
        <BannerLeft>
          <Carousel effect='fade' autoplay>
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
      </div>
    </BannerWrapper>
  )
})
