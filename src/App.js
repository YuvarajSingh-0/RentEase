import './App.css';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import OwnerDashboard from './pages/OwnerDashboard';
import Navbar from './components/Navbar';
import Payments from './pages/Payments';
import Issues from './pages/Issues';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className='main'>
          <Switch>
            <Route path='/' element={<OwnerDashboard />} />
            <Route path='/issues/*' element={<Issues />} />
            <Route path='/payments' element={<Payments />} />
            <Route path='/profile' element={<Profile/>} />
            {/*
            <Route path='/logout' element={Logout} /> */}
          </Switch>
        </div>
        {/* <div className="right-content">
          <h1>Communities Hub</h1>
        </div> */}
      </div>
    </BrowserRouter>

  );
}

export default App;
