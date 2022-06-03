import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'

import { auth } from "../../firebase-client"
import { signOut } from 'firebase/auth'

import avatar from '../../assets/images/avatar.svg'
import profile from '../../assets/images/profile.svg'
import logout from '../../assets/images/logout.svg'

import styles from '../../assets/scss/topbar.module.scss'
import MenuContext from '../../context/MenuContext'

import {removeMember} from '../../store/slices/memberSlice'

function Topbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {email} = useSelector(state => state.member.member);

    const [isOpen, setIsOpen] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState(email);

    useEffect(() => {
        setCurrentUserEmail(email);
    }, [email])
    
    const toggle = () => setIsOpen(!isOpen);

    const signIn = (e) => {
        e.preventDefault();
        navigate('signin');
    }
    
    const signout = () => {
        signOut(auth);
        toggle();
        dispatch(removeMember());
        navigate('/');
    }

    const goToProfile = () => {
        toggle();
        navigate('auth/profile');
    }

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
            <label className={burgerClasses} for="menu-toggle">
              <span></span>
            </label>
          </div>
          <div>
            <div className='mt-2'>
                {!!currentUserEmail && (
                    <div className={styles.authHeader} onClick={toggle}>
                        <div>
                            <span className={styles.email}>{currentUserEmail}</span>
                            <img className={styles.avatar} src={avatar} alt='avatar'/>
                        </div>
                    </div>
                )}
                {!currentUserEmail && (
                    <div className={styles.authHeader} onClick={signIn}>
                        <span className={styles.signIn}>Sign In</span>
                    </div>
                )}
                {isOpen && (
                    <div className={styles.dropdownList} >
                        <div className={styles.dropdownItem} onClick={goToProfile}>
                            <img className={styles.imgProfile} src={profile} alt='profile' />
                            Profile
                        </div>
                        <div className={styles.dropdownDivider}></div>
                        <div className={styles.dropdownItem} onClick={signout}>
                            <img className={styles.imgProfile} src={logout} alt='logout' />
                            Sign Out 
                        </div>
                    </div>
                )}
            </div>
          </div>  
        </nav>
    )
}

export default Topbar