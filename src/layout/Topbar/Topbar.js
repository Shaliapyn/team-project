import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { auth } from "../../firebase-client";
import {onAuthStateChanged} from 'firebase/auth';
import { signOut } from 'firebase/auth'; 
import {useNavigate} from 'react-router-dom';

import avatar from '../../assets/images/avatar.svg';
import profile from '../../assets/images/profile.svg';
import logout from '../../assets/images/logout.svg';

import styles from '../../assets/scss/topbar.module.scss';

function Topbar() {
    const navigate = useNavigate();
    
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setCurrentUser(user)
        })
      }, [])
    
    const toggle = () => setIsOpen(!isOpen);

    const signIn = (e) => {
        e.preventDefault();
        navigate('/auth');
    }
    
    const signout = () => {
        signOut(auth);
        toggle();
        navigate('/');
    }

    const goToProfile = () => {
        toggle();
        navigate('/profile');
    }
           
    return (
        <nav className={styles.navbar}>
            <div className='mt-2'>
                {/* {isOpen && (
                    <div className={styles.authHeader} onClick={toggle}>
                        <div>
                            <span className='me-1'>email.address@email.com</span>
                            <img className={styles.avatar} src={avatar} alt='avatar'/>
                        </div>
                    </div>
                )}
                {!isOpen && (
                    <div className={styles.authHeader} onClick={toggle}>
                        <span className={styles.signIn}>Sign In</span>
                    </div>
                )} */}

{/* <NavLink className='header-ref' to="/"> Home </NavLink>
                <NavLink className='header-ref' to={currentUser ? '' : "/signup"}> {!currentUser ? 'Sign Up' : `` } </NavLink>
                <NavLink className='header-ref' to={currentUser ? '' : "/signin"}> {!currentUser ? 'Sign In' : ``} </NavLink>
                <NavLink className='header-ref' to={!currentUser ? '' : "/auth/signout"}> {currentUser ? 'Sign Out' : ''} </NavLink>
                <NavLink className='header-ref' to={!currentUser ? '' : "/auth/recipes"}> {!currentUser ? '' : `Your email: ${currentUser.email}` } </NavLink>
            </header> */}

                {currentUser && (
                    <div className={styles.authHeader} onClick={toggle}>
                        <div>
                            <span className={styles.email}>{currentUser.email}</span>
                            <img className={styles.avatar} src={avatar} alt='avatar'/>
                        </div>
                    </div>
                )}
                {!currentUser && (
                    <div className={styles.authHeader} onClick={signIn}>
                        <span className={styles.signIn}>Sign In</span>
                    </div>
                )}
                     
                
                {/* {isOpen && (
                    <div className={styles.dropdownList} >
                        <div className={styles.dropdownItem} onClick={toggle} >
                            <img className={styles.imgProfile} src={profile} alt='profile' />
                            Profile
                        </div>
                        <div className={styles.dropdownDivider}></div>
                        <div className={styles.dropdownItem} onClick={toggle}>
                            <img className={styles.imgProfile} src={logout} alt='logout' />
                            Sign Out 
                        </div>
                    </div>
                )} */}

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
        </nav>
    );
}
  
export default Topbar;