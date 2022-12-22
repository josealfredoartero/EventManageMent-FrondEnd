import React, { useState, useContext, useEffect} from 'react';
import { Modal, ContainerModal, Container, Containers } from '../elements/style';
import Input from './Input';
// import Input from './Input';
import InputFile from './InputFile';
// import Textarea from './Textarea';
import axios from 'axios';
import Textarea from './Textarea';
import AuthContext from '../context/Auth';


const ModalEditEvent = ({state, setState, id}) => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    


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
    // const sendEvent = async (e) => {
    //     e.preventDefault();
    //     await axios.post("http://127.0.0.1:8000/api/events",{
    //         title:title,
    //         description:description,
    //         date:date,
    //         image:image[0]
    //     }, header)
    //     .then(response =>{
    //         console.log(response);
    //         if (response.status === 200) {
    //             setState(false);
    //             refresh()
    //         }
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     })
    // } 

  return (
    <>
    {
        state &&
        <Modal >
            <ContainerModal bg="dark">
                <h1 className='text-center'>Editar Evento</h1>
                <div>
                    <form >
                        <Input state={title} setState={setTitle} />
                        <Textarea state={description} setState={setDescription}/>
                        <Input state={date} setState={setDate} />
                        {/* <InputFile images={image} setImages={setImage} /> */}

                    </form>
                    <button className='btn btn-danger me-3' onClick={()=>setState(false)}>Cerrar</button>
                    <button className='btn btn-success'>Actualizar</button>
                    
                    
                </div>
            </ContainerModal>
        </Modal>
    }
    </>
  )
}

export default ModalEditEvent