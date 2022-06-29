import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from 'firebase-client'
import { signOut } from 'firebase/auth'
import profile from 'assets/images/profile.svg'
import logout from 'assets/images/logout.svg'

import styles from 'assets/scss/topbar.module.scss'
import MenuContext from 'context/MenuContext'

import { memberState, removeMember } from 'store/slices/memberSlice'

function Topbar() {
  const member = useSelector(memberState)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { email } = useSelector((state) => state.member.member)
  const [photoURL, setPhotoURL] = useState(
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
  )

  useEffect(() => {
    if (member?.userPhoto) {
      setPhotoURL(member.userPhoto)
    }
  }, [member.userPhoto])

  // useEffect(() => {
  //   if (auth.currentUser?.photoURL) {
  //     setPhotoURL(auth.currentUser.photoURL)
  //   }
  // }, [auth.currentUser])

  const [show, setShow] = useState(false)
  const [currentUserEmail, setCurrentUserEmail] = useState(email)
  const ref = useRef()

  useEffect(() => {
    setCurrentUserEmail(email)
  }, [email])

  useEffect(() => {}, [])

  const toggle = () => setShow(!show)

  const signIn = (e) => {
    e.preventDefault()
    navigate('signin')
  }

  const signout = () => {
    signOut(auth)
    dispatch(removeMember())
    toggle()
    navigate('/')
  }

  const goToProfile = () => {
    toggle()
    navigate('auth/profile')
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [show])

  const { isMenuCheked, setIsMenuChecked } = useContext(MenuContext)
  const burgerClasses = isMenuCheked ? `${styles.menuBtn} ${styles.bgBurger}` : styles.menuBtn
  const menuToggleClasses = isMenuCheked ? `${styles.menuToggleActive} ${styles.menuToggle}` : styles.menuToggle

  return (
    <nav className={styles.navbar}>
      <div className={styles.headerBuger}>
        <input
          id="menu-toggle"
          className={menuToggleClasses}
          onClick={() => setIsMenuChecked(!isMenuCheked)}
          type="checkbox"
        />
        <label className={burgerClasses} htmlFor="menu-toggle">
          <span></span>
        </label>
      </div>
      <div>
        <div className="mt-2">
          {!!currentUserEmail && (
            <div className={`${styles.authHeader}`} onClick={toggle}>
              <div className="pt-1 d-flex align-items-center">
                <h4 className="h4">{member.role}</h4>
              </div>
              <div style={{ marginRight: '14px', marginLeft: '14px' }} className="vr"></div>
              <div className="d-flex align-items-center">
                <span className="">{currentUserEmail}</span>
                <img className={styles.avatar} src={photoURL} alt="avatar" />
              </div>
            </div>
          )}
          {!currentUserEmail && (
            <div className={styles.authHeader} onClick={signIn}>
              <span className={styles.signIn}>Sign In</span>
            </div>
          )}

          {show && (
            <form className={styles.dropdownList} onSubmit={signout} action="" ref={ref}>
              <button type="button" className={styles.dropdownItem} onClick={goToProfile}>
                <img className={styles.imgProfile} src={profile} alt="profile" />
                Profile
              </button>
              <div className={styles.dropdownDivider}></div>
              <button type="submit" className={styles.dropdownItem}>
                <img className={styles.imgProfile} src={logout} alt="logout" />
                Sign Out
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Topbar
