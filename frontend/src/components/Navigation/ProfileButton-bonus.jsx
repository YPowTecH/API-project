import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton'

// import ManageSpots from '../ManageSpots/ManageSpots';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ProfileButton-bonus.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navi = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const currUser = useSelector((state) => state.session.user)


  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navi('/')
  };

  const closeSpot = () => {
    closeMenu()
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className='Menu-container'>
              <div className='login-text'>
                <div className='Username'>Username: {user.username}</div>
                <div>Hello, {user.firstName}</div>
                <div>Email: {user.email}</div>
                <hr className='PF-hr'/>
              {currUser && (
                <div className='ManageSpots-container'>
                  <Link to='/spots/current' className='Manage-text' onClick={closeSpot}>Manage Spots</Link>
                </div>)}
                </div>
              <div className='logout-btn-container'>
                <button className='logout-btn' onClick={logout}>Log Out</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='Login-Signup-container'>
              <li className='Login-btn'>
                <OpenModalButton
                  buttonText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li className='Signup-btn'>
                <OpenModalButton
                  buttonText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
