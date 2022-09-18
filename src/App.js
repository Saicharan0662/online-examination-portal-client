import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import ActivateAccount from './pages/ActivateAccount';
import ExamForm from './components/ExamForm';

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
          <Route exact path='/activate/:userType/:token' element={<ActivateAccount />} />
          <Route exact path='/create-exam' element={<ExamForm />} />
          <Route exact path='/edit-exam/:examID' element={<ExamForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
