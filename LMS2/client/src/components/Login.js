
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgImage from '../photos/loginBG.jpg';
import loginCartoon from '../photos/loginCartoon.webp';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email });
      console.log(response.data);
      setError('');
      toast.success(`OTP sent to ${email}`);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      console.log(response.data.token);
      setError('');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email);
      navigate(response.data.redirectPath);
      toast.success('Successful login!');
    } catch (error) {
      setError(error.response.data.error);
      toast.error('Failed login!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.id === 'emailInput') {
        handleSendOtp();
      } else if (e.target.id === 'otpInput') {
        handleVerifyOtp();
      }
    }
  };

  return (
    <div className='h-screen bg-no-repeat bg-cover bg-center w-screen' style={{ backgroundImage: `url(${bgImage})` }} >
      <div className='flex h-screen w-screen justify-center items-center isolate aspect-video rounded-xl bg-white/70 shadow-lg ring-1 ring-black/5'>
        <div className='absolute z-10 opacity-100'  style={{ marginLeft: '-45%' }}>
          <img src={loginCartoon} alt='LoginCartoonAvatar' className='w-1/2 h-1/2'></img>
        </div>
        <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2  isolate aspect-video rounded-xl bg-white/80 shadow-lg ring-1 ring-black/5 relative'>
          <h2 className='text-2xl font-semibold mb-4'>Login</h2>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-600 font-mono'>Email</label>
            <input id="emailInput" type="text" placeholder="Email" value={email} onChange={handleEmailChange} onKeyDown={handleKeyPress} className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'/>
            <button onClick={handleSendOtp} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-1/2 m-2'>Send OTP</button>
          </div>
          
          <div className='mb-4 flex justify-center items-center'>
            <input id="otpInput" type="text" placeholder="OTP" value={otp} onChange={handleOtpChange} onKeyDown={handleKeyPress} className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'/>
            <button onClick={handleVerifyOtp} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full m-2'>Verify OTP</button>
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
