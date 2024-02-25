import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const disable = () => {
    return (
      username.length < 4 ||
      password.length < 6 ||
      !firstName ||
      !lastName ||
      !email ||
      !confirmPassword
    )
  }

  return (
    <>
    <div className='Signup-form-container'>
      <h1>Sign Up</h1>
      <form className='Signup-form' onSubmit={handleSubmit}>
        <div className ='Fill-in-container'>
          <input
            type="text"
            value={firstName}
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        {errors.firstName && <p className='errors'>{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        {errors.lastName && <p className='errors'>{errors.lastName}</p>}
          <input
            type="text"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p className='errors'>{errors.email}</p>}
          <input
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        {errors.username && <p className='errors'>{errors.username}</p>}
          <input
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p className='errors'>{errors.password}</p>}
          <input
            type="password"
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
        </div>
        <button className='Sign-up-btn' type="submit" disabled={disable()}>Sign Up</button>
      </form>
      </div>
    </>
  );
}

export default SignupFormModal;
