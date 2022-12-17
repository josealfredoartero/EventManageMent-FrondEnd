import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import Input from './Input';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import AuthContext from '../context/Auth';
import {ContainerForm, Button} from '../elements/style';



const Register = ({autenticacion}) => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirpassword, setConfirPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const sendRegister = async(e) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:8000/api/register",{
            name:name,
            email:email,
            password: password,
            password_confirmation:confirpassword
        })
        .then(response => {
            // console.log(response);
            navigate("/login");
        })
        .catch(error => {
            // console.log(error.response.data);
            setErrors(error.response.data.errors)
        })
    }

    const cancel = (e) => {
        e.preventDefault();
        navigate("/");
    }

    useEffect(() => {
      if(user !== ''){
        navigate("/");
      }
    }, [user])

  return (
    <ContainerForm>
        <form>
            <h2 className='text-white'>Registrarse</h2>
            <Input label="Nombre" state={name} setState={setName} error={errors.name}/>
            <Input label="E-Mail" state={email} setState={setEmail} error={errors.email}/>
            <Input type='password' label="Contraseña" state={password} setState={setPassword} error={errors.password}/>
            <Input type='password' label="Confirmar Contraseña" state={confirpassword} setState={setConfirPassword} />
            <div>
                <Button color='green' onClick={sendRegister}>Registrarse</Button>
                <Button color='red' onClick={cancel}>Cancelar</Button>
            </div>
        </form>
    </ContainerForm>
  )
}

export default Register;
