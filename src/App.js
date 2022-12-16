import {BrowserRouter as Routers, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { AuthProvider } from './context/Auth';
import Register from './components/Register';
import Login from './components/Login';
import Navbars from './components/Navbars';
import Index from './components/Index';

function App() {
  return (
    <Routers>
      <AuthProvider>
        <Navbars />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </Routers>
  );
}

export default App;
