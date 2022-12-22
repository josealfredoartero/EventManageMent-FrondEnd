import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { Modal,ContainerModal } from '../elements/style';
import { UrlApi, api } from '../hooks/encodeBase64';

const SeeEvent = ({state, setState, id=null}) => {

    const [event, setEvent] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const getEvent = async() => {
        await axios.get(`http://127.0.0.1:8000/api/events/${id}`)
        .then(response => {
            console.log(response);
            setEvent(response.data)
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getEvent();
    }, [id])

  return (
    <>
        {
            state &&
            <Modal>
                <ContainerModal>
                <img style={{maxWidth:"80%", margin:"0px 10%"}} src={`${api}${event.image}`}  alt=''/>

                    <h1 className='text-center'>{event.title}</h1>
                    <p className='text-justify'>{event.description}</p>
                    <p className='text-justify'>{event.date}</p>
                    

                    <button className='btn btn-danger ' onClick={()=>setState(false)}>Cerrar</button>
                </ContainerModal>
            </Modal>
        }
    </>
  )
}

export default SeeEvent


