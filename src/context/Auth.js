import axios from "axios";
import { createContext, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    const getToken = () =>{
        setToken(localStorage.getItem('token'));
    }

    const header = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }
      }

    const authorization = async() => {
        await axios.get('http://127.0.0.1:8000/api/profile',header)
        .then(response => {
            // console.log(response.data)
            if(response.status === 200){
                // console.log(response.data);
                setAuthenticated(response.data);
            }
        })
        .catch(error => {
            // console.log(error);
            setAuthenticated('');
        })
    }

    const logout = async()=>{
        await axios.post('http://127.0.0.1:8000/api/logout',{},header)
        .then(response => {
            // console.log(response);
            if(response.status === 200){
                localStorage.removeItem('token')
                navigate('/');
                getToken();
            }
        })
        .catch(error => console.log(error))
    }
    
    useEffect(() => {
        authorization();
    },[token])
    
    
    const data = {authenticated, setAuthenticated, token, setToken, getToken, logout, header};
    return (
        <AuthContext.Provider value={data} >{children}</AuthContext.Provider>
    )
}

export {AuthProvider};
export default AuthContext;