import {BrowserRouter as Routers, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { AuthProvider } from './context/Auth';
import Register from './components/Register';
import Login from './components/Login';
import Navbars from './components/Navbars';
import Index from './components/Index';
import PublicationManage from './components/PublicationManage';
import ModalEditPublication from './components/ModalEditPublication';

function App() {
  return (
    <Routers>
      <AuthProvider>
        <Navbars />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/manage/publications' element={<PublicationManage />} />
          <Route path='/manage/events' element={<ModalEditPublication />} />
        </Routes>
      </AuthProvider>
    </Routers>
  );
}

export default App;
