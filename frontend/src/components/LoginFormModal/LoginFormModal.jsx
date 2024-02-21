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

  const demoUser = (e) =>{
    e.preventDefault()
    setErrors({})
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password'}))
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
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className='errors'>{errors.credential}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className='errors'>{errors.password}</p>}
        <button type="submit" disabled={credential.length<4 || password.length <6}>Log In</button>
        <button type='submit' onClick={demoUser}>Log in as Demo User</button>
      </form>

    </>
  );
}

export default LoginFormModal;
