import React from 'react';
import axios from 'axios';
import {useState, useContext, useEffect} from 'react';
import Input from './Input';
import {useNavigate, Link} from 'react-router-dom';
import AuthContext from '../context/Auth';
import {ContainerForm, Button} from '../elements/style';


const Login = () => {
  const navigate = useNavigate();
  const {getToken, user} = useContext(AuthContext)

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState([]);

const login = async(e) => {
  e.preventDefault();
  e.target.disabled = true;
    await axios.post('http://127.0.0.1:8000/api/login',{
        email:email,
        password:password
    })
    .then(response => {
      // console.log(response);
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        getToken();
        navigate("/");
      }else{
        console.log(response);
      }
    })
    .catch(error => {
        e.target.disabled = false;
        console.log(error);
        if(error.response.status === 422){
          setErrors(error.response.data.errors);
        }else if(error.response.status === 401){
          setErrors(error.response.data)
        }
    })
}

useEffect(() => {
  if(user !== ''){
    navigate("/");
  }
}, [user])
  return (
    <ContainerForm>
        <h2 className='text-white'>Iniciar Secion</h2>
        {errors.message && 
        <p className='text-danger'>{errors.message}</p>
        }
        <Input label='Correo' state={email} setState={setEmail} error={errors.email}/>
        <Input type='password' label='Contraseña' state={password} setState={setPassword} error={errors.password}/>
        <div>
            <Button color='green' onClick={login}>Iniciar Secion</Button>
        </div>
    </ContainerForm>
  )
}

export default Login;
