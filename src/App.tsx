import React from 'react';
import './App.css';

// React router DOM imports
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { AppRoutes } from './routes/Routes';
import CopyRight from './components/dashboard/CopyRight';


function App() {
  return (
    <div className="App">
      {/**
       * <RegisterForm />
       * <LoginForm />
       */
      }
      <Router>
       {/**<nav>
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
        </nav> */} 
        <AppRoutes />

      </Router>

      <CopyRight />

    </div>
  );
}

export default App;
