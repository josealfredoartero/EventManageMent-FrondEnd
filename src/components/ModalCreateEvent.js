import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/Auth';
import { ContainerModal, Modal } from '../elements/style';
import Input from './Input';
import InputFile from './InputFile';
import Textarea from './Textarea';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const ModalCreateEvent = ({state, setState, refresh}) => {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ date, setDate ] = useState("");
    const [ image, setImage ] = useState([]);
    const [errors, setErrors] = useState([]);


    const {header} = useContext(AuthContext);

    const sendEvent = async (e) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:8000/api/events",{
            title:title,
            description:description,
            date:date,
            image:image[0]
        }, header)
        .then(response =>{
            console.log(response);
            if (response.status === 200) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                  });
                setState(false);
                refresh()
            }
        })
        .catch(error =>{
            toast.error("Error !!!", {
                position: toast.POSITION.TOP_RIGHT
              });
              if(error.response.status === 422){
                setErrors(error.response.data.errors);
              }
            console.log(error);
        })
    } 

    const cleanData = () => {
        setTitle('');
        setDate('');
        setDescription('');
        setImage('');
        setErrors([])
    }

    useEffect(()=>{
        cleanData();
    },[state])

    
  return (
    <>
    {
        state &&
        <Modal>
            <ContainerModal bg="dark">
                <h1 className='text-center'> Crear Evento </h1>
                <form>
                    <Input error={errors.title} label="Titulo" state={title} setState={setTitle}/>
                    <Textarea error={errors.description} label="Descripción" state={description} setState={setDescription}/>
                    <Input error={errors.date} label='Fecha' type='date' state={date} setState={setDate}/>
                    <InputFile error={errors.image} images={image} setImages={setImage} />
                </form>
                <div className='text-center'>
                <button onClick={sendEvent} className='btn btn-success me-3'>Enviar</button>
                <button className='btn btn-danger' onClick={()=>setState(false)} >Cerrar</button>
                </div>
            </ContainerModal>
        </Modal>
    }
    </>
  )
}

export default ModalCreateEvent;