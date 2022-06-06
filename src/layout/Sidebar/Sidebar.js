import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SidebarData } from './SidebarData'
import styles from '../../assets/scss/sidebar.module.scss'
import { SmileSvg, ArrowSvg } from '../../assets/svg/svg-icons'
import MenuContext from '../../context/MenuContext'

const Sidebar = () => {
  const [isSidebarBig, setIsSidebarBig] = useState(true)
  const sidebarClasses = isSidebarBig ? styles.sidebar : `${styles.sidebar} ${styles.sidebarActive}`
  const sidebarArrowClasses = isSidebarBig ? styles.sidebarArrow : `${styles.sidebarArrow} ${styles.sidebarArrowActive}`
  const sidebarLiClasses = isSidebarBig ? styles.sidebarLi : `${styles.sidebarLi} ${styles.sidebarLiActive}`
  const sidebarIconLiClasses = isSidebarBig ? styles.iconLi : `${styles.iconLi} ${styles.iconLiActive}`

  const { isMenuCheked, setIsMenuChecked } = useContext(MenuContext)
  const hideSideBarClass = isMenuCheked ? `${styles.menuToggle}` : null

  const role = useSelector(state => state.member.member.role);
  const [currentUser, setCurrentUser] = useState(role);
  
  useEffect(() => {
      setCurrentUser(role);
  }, [role])

  return (
    <>
      <nav className={`${sidebarClasses} ${hideSideBarClass}`}>
        <div className={styles.roleBlock}>
          {isSidebarBig && <SmileSvg />}
          <h2 className={styles.roleText}>Role:</h2>
        </div>
        <hr className={styles.horizonLine} />
        <ul style={{ paddingLeft: '0px' }}>
          {!!currentUser && (SidebarData.map((el, key) => (
            <Link
              onClick={() => setIsMenuChecked(false)}
              key={key}
              className={`text-white ${styles.Link}`}
              to={el.link}
            >
              {el.rolesAccess.includes(currentUser) && 
                <li className={sidebarLiClasses}>
                  <div className={sidebarIconLiClasses}>{el.icon}</div>
                  {isSidebarBig && <div>{el.title}</div>}
                </li>}
            </Link>
          )))}
        </ul>
        <hr className={styles.horizonLine} />
        {!isMenuCheked && (
          <div className={sidebarArrowClasses}>
            <ArrowSvg onClick={() => setIsSidebarBig(!isSidebarBig)} />
          </div>
        )}
      </nav>
    </>
  )
}

export default Sidebar
