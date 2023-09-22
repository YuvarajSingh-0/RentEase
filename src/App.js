import './config/firebase'
import './App.css';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import OwnerDashboard from './pages/ownerInfo/OwnerDashboard';
import Navbar from './components/Navbar';
import Payments from './pages/Payments';
import Issues from './pages/ownerInfo/Issues';
import Profile from './pages/Profile';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase'
import IsOwner from './pages/IsOwner';

const PrivateRoutes = ({ children }) => {

  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/auth/*' element={
            <PrivateRoutes>
              <Navbar />
              <div className='main'>
                <Routes>
                  <Route path='/' element={<IsOwner />} />
                  <Route path='/ownerdashboard' element={<OwnerDashboard />} />
                  <Route path='/issues/*' element={<Issues />} />
                  <Route path='/payments' element={<Payments />} />
                  <Route path='/profile' element={<Profile />} />
                </Routes>
              </div>
            </PrivateRoutes>
          } />
          <Route path='/*' element={<h1>NOT FOUND</h1>} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
