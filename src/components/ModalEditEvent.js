import React, { useState, useContext, useEffect} from 'react';
import { Modal, ContainerModal, Container, Containers } from '../elements/style';
import Input from './Input';
import InputFile from './InputFile';
import axios from 'axios';
import Textarea from './Textarea';
import AuthContext from '../context/Auth';
import {  toast } from 'react-toastify';



const ModalEditEvent = ({state, setState, id, refresh}) => {

    const {header} = useContext(AuthContext);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState([]);


    const getEvent = async() => {
        await axios.get(`http://127.0.0.1:8000/api/events/${id}`)
        .then(response => {
            console.log(response);
            setTitle(response.data.title)
            setDescription(response.data.description)
            setDate(response.data.date)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getEvent();
    }, [state])

    // const {header} = useContext(AuthContext)
    const updateEvent = async (e) => {
        e.preventDefault();
        await axios.put(`http://127.0.0.1:8000/api/events/${id}`,{
            title:title,
            description:description,
            date:date,
            image:image[0]
        }, header)
        .then(response =>{
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
        })
    } 

  return (
    <>
    {
        state &&
        <Modal >
            <ContainerModal bg="dark">
                <h1 className='text-center'>Editar Evento</h1>
                <div>
                    <form >
                        <Input label='Titulo' state={title} setState={setTitle} />
                        <Textarea label='Descripcion' state={description} setState={setDescription}/>
                        <Input label='Fecha' type='date' state={date} setState={setDate} />
                        <InputFile images={image} setImages={setImage} />
                    </form>
                <div className="text-center">
                    <button onClick={updateEvent} className='btn btn-success me-3'>Actualizar</button>
                    <button className='btn btn-danger ' onClick={()=>setState(false)}>Cerrar</button>
                </div>
                    
                    
                </div>
            </ContainerModal>
        </Modal>
    }
    </>
  )
}

export default ModalEditEvent