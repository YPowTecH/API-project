import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';
import './Navigation-bonus.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className = 'Navigation-Header'>
      <div>
        <NavLink to="/"><img className='LandingPageLogo' src='../images/EldenLodges-logo.png' alt='Home'></img></NavLink>
      </div>
      <div>
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}

      </div>

    </div>

  );
}

export default Navigation;
