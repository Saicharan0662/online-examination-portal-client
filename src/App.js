import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
