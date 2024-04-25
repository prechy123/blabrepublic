import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/userContext';

const Register = () => {
  const { register, setError, error } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password2, setPassword2] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle image upload if applicable
    if (password !== password2) {
      setError('Passwords does not match');
      return;
    }
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('img', imageFile);
    const status = await register(formData);
    console.log(status);
    if (status.success) {
      navigate('/login');
      setUsername('');
      setPassword('');
      setEmail('');
      setImageFile(null);
      setFirstname('');
      setLastname('');
      setPassword2('');
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deepPurple py-10">
      <div className="bg-lightPurple rounded-lg shadow-md px-8 py-10 w-full md:w-1/2 mt-32">
        <h2 className="text-2xl font-bold text-center text-lemonGreen mb-6">Register</h2>
        { error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Firstname */}
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>

            {/* Lastname */}
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>            

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Password2 */}
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Profile Image (optional)
              </label>
              <input
                type="file"
                name='img'
                id="image"
                className="bg-white focus:outline-none focus:ring-lemonGreen focus:border-lemonGreen w-full p-3 rounded-lg border border-gray-300"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-lemonGreen hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lemonGreen text-center text-white rounded-lg"
          >
            Register
          </button>
        </form>
        <Link to='/login' className="text-sm text-gray-700 hover:underline">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
