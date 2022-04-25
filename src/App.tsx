import React from 'react';
import './App.css';

// React router DOM imports
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { KatasPage } from './pages/KatasPage';
import { KataDetailsPage } from './pages/KataDetailsPage';

function App() {
  return (
    <div className="App">
      {/**
       * <RegisterForm />
       * <LoginForm />
       */
      }
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home page</Link>
            </li>
            <li>
              <Link to='/katas'>kata page</Link>
            </li>
            <li>
              <Link to='/register'>Register page</Link>
            </li>
            <li>
              <Link to='/login'>Home page</Link>
            </li>
          </ul>
        </nav>
        {/**
         * Crear carpeta routes
         */}
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/katas' element={<KatasPage />}></Route>
          <Route path='/katas/:id' element={<KataDetailsPage />}></Route>
          <Route path='/katas/:id' element={<KataDetailsPage />}></Route>
          {/**Redireccion de ruta no encontrada */}
          <Route path='*'
            element={<Navigate to="/" />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
