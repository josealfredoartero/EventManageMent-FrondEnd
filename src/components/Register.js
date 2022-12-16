import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import Input from './Input';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import AuthContext from '../context/Auth';
import {ContainerForm, Button} from '../elements/style';



const Register = ({autenticacion}) => {
    const navigate = useNavigate();
    const {authenticated} = useContext(AuthContext);

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
            console.log(error.response.data);
            setErrors(error.response.data.errors)
        })
    }

    const cancel = (e) => {
        e.preventDefault();
        navigate("/");
    }

    useEffect(() => {
      if(authenticated !== ''){
        navigate("/");
      }
    }, [])

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

// const Container = styled.div`
//     width: 500px;
//     min-height: 350px;
//     max-height: 800px;
//     text-align: center;
//     margin: 8% auto;
//     padding: 10px auto 30px;
//     border: 2px solid black;
//     box-shadow: 2px 10px 10px 1px rgba(0, 0, 0, 0.5);
//     background: rgb(0, 80, 110);
//     border-radius: 13px;

//     .div{
//         align-items: center;
//         justify-content: center;
//     }
// `;