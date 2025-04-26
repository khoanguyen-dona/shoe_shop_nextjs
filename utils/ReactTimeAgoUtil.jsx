import React from 'react'

import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi'
TimeAgo.addLocale(vi)



const ReactTimeAgoUtil = ({date,locale}) => {
  return (
    <ReactTimeAgo date={date} locale={locale}/>
  )
}

export default ReactTimeAgoUtil