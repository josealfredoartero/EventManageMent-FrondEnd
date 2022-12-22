import axios from "axios";
import { createContext, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
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
                localStorage.setItem('user', response.data)
                setUser(response.data);
            }
        })
        .catch(error => {
            // console.log(error);
            setUser('');
            localStorage.removeItem('user')
        })
    }

    const logout = async()=>{
        await axios.post('http://127.0.0.1:8000/api/logout',{},header)
        .then(response => {
            if(response.status === 200){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate('/');
                getToken();
            }
        })
        .catch(error => console.log(error))
    }
    
    useEffect(() => {
        if(localStorage.getItem('user')){
            setUser(localStorage.getItem('user'))
        }
        authorization();
    },[token])
    
    
    const data = {user, setUser, token, setToken, getToken, logout, header};
    return (
        <AuthContext.Provider value={data} >{children}</AuthContext.Provider>
    )
}

export {AuthProvider};
export default AuthContext;