// import React, { useState } from 'react';
// import axios from 'axios';
// import './login.css'
// const LoginPage = ({ setAdmin }) => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = "https://trendybazarr.onrender.com/api/auth/login";
//       const response = await axios.post(url, formData);
//       const data = response.data;
//       localStorage.setItem('authToken',data.token)
//       localStorage.setItem('admin', JSON.stringify(data));
//       setAdmin(JSON.stringify(data));
//       console.log('Login Successfullylogin');
//     } catch (error) {
//       setErrorMessage('Login failed. Please check your credentials.');
//       setTimeout(handleSubmit, 5000); // Retry after 5 seconds

//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <div className="login min-h-screen flex items-center justify-center  ">
//       <div className=" bg-white bg-opacity-85 p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               required
//               className="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// Password              
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//               className="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:ring- 2 focus:ring-indigo-500 focus:ring-opacity-50"
//             >
//               Login
//             </button>
//           </div>
//           {errorMessage && (
//             <p className="text-red-500 text-sm">{errorMessage}</p>
//           )}
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-500">
//           Don't have an account?{' '}
//           <a href="#" className="text-indigo-600 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const LoginPage = ({ setAdmin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [retry, setRetry] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const url = "https://trendybazarr.onrender.com/api/auth/login";
      const response = await axios.post(url, formData);

      const data = response.data;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data));
      setAdmin(data); // No need for JSON.stringify
      console.log('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your credentials.');

      // Optionally suggest retry to user
      setRetry(true);
    }
  };

  return (
    <div className="login min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-85 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </form>

        {retry && (
          <p className="text-sm text-center mt-2 text-gray-600">
            Having trouble?{' '}
            <button
              className="text-blue-600 hover:underline"
              onClick={handleSubmit}
            >
              Try again
            </button>
          </p>
        )}

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
