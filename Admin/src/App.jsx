import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Componet/Navbar/navbar'; // Importing the Navbar component
import Dashboard from './Componet/Dashboard/dashboard'; // Importing the Navbar component
import "./App.css"
import ProductForm from './Componet/ProductForm/productform';
import MyProduct from './Componet/MyProducts/myproduct';
import LoginPage from './Componet/Signup/Login';
import ErrorBoundary from './Componet/ErrorBoundary';
import EditProduct from './Componet/EdithProduct/EdithProduct';
import Showorders from './Componet/Orders/showOrder/Showorders';
import Imgur from './Componet/Imageur/Imgur';

function App() {
  const [admin, setAdmin] = useState(localStorage.getItem('admin'));

  return (
    <Router>
      {admin ? (
        <>
           <ErrorBoundary>
          <Navbar />
          <div className="admin-panels-componet">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/myproduct" element={<MyProduct />} />
              <Route path="/#/myproduct" element={<MyProduct />} />
              <Route path="/Imgur" element={<Imgur />} />
              <Route path="/#/Imgur" element={<Imgur />} />
              <Route path="/productform" element={<ProductForm />} />
              <Route path="/EdithProduct" element={<EditProduct />} />
              <Route path="/#/EdithProduct" element={<EditProduct />} />
              <Route path="/#/orders" element={<Showorders/>}/>
              <Route path="/orders" element={<Showorders/>}/>


              <Route path="*" element={<div>
                      <center>
                           404
                      <p>Not founded this page </p>
                      </center>
              </div>} /> {/* Optional: handle 404 */}

            </Routes>
          </div>
          </ErrorBoundary>

        </>
      ) : (
        <LoginPage setAdmin={setAdmin} />
      )}
    </Router>
  );
}

export default App;