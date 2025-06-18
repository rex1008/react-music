import React, { memo } from 'react'
import { connect } from 'react-redux'


function MCRecommend() {
  return (
    <div>
      <h2>MCRecommend</h2>
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(memo(MCRecommend))
