import React from 'react'
import styles from './Bio.module.css'
import { getGravatarURL } from '../utils/getGravatarURL'

function Bio(props) {
  let photoURL = getGravatarURL({
    email: "test1@example.com",
    size: 56,
  })

  return (
    <div className={`
      ${styles.Bio}
      ${props.className || ''}
    `}>
      <img src={photoURL} alt="Me" />
      <p>
        来自大资产中台前端团队的实践经验，用心做原创
        <br />
        分享关于 React、数据可视化、效率工具等，打造专业前端工具链
      </p>
    </div>
  )
}

export default Bio
