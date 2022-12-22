import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/Auth';
import { ContainerModal, Modal } from '../elements/style';
import Input from './Input';
import InputFile from './InputFile';
import Textarea from './Textarea';


const ModalCreateEvent = ({state, setState, refresh}) => {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ date, setDate ] = useState("");
    const [ image, setImage ] = useState([]);


    const {header} = useContext(AuthContext)
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
                setState(false);
                refresh()
            }
        })
        .catch(err =>{
            console.log(err);
        })
    } 

    const cleanData = () => {
        setTitle('');
        setDate('');
        setDescription('');
        setImage('');
    }

    useEffect(()=>{
        cleanData();
    },[])

    
  return (
    <>
    {
        state &&
        <Modal>
            <ContainerModal bg="dark">
                <h1 className='text-center'> Crear Evento </h1>
                <form>
                    <Input label="Titulo" state={title} setState={setTitle}/>
                    <Textarea label="Descripción" state={description} setState={setDescription}/>
                    <Input label='Fecha' type='date' state={date} setState={setDate}/>
                    <InputFile images={image} setImages={setImage} />
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