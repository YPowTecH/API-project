import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = (e) => {
    e.preventDefault()
    setErrors({})
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setErrors(data.errors)
        }
      })
  }

  return (
    <>
      <div className='Loginform-container'>
        <h1 className='Loginform-title'>Log In</h1>
        <form className='Loginform' onSubmit={handleSubmit}>
          <div>
            <input
              className='Login-inputfield'
              type="text"
              value={credential}
              placeholder='Username or Email'
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div className='Errors-text'>
            {errors.credential && <p className='errors'>{errors.credential}</p>}
          </div>
          <div>
            <input
              className='Login-inputfield'
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className='Errors-text'>
              {errors.credential && <p className='errors'>{errors.password}</p>}
            </div>
          </div>
          <div className='Login-buttons'>
            <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
            <span className='Login-demo' type='submit' onClick={demoUser}>Log in as Demo User</span>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
