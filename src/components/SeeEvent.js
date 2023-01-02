import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { Modal,ContainerModal, ContentCenter, Btnclose } from '../elements/style';
import { UrlApi, api } from '../hooks/encodeBase64';

const SeeEvent = ({state, setState, id=null}) => {

    const [event, setEvent] = useState([]);

    const getEvent = async() => {
        await axios.get(`http://127.0.0.1:8000/api/events/${id}`)
        .then(response => {
            setEvent(response.data)
            
        })
        .catch(error => {
            // console.log(error)
        })
    }

    useEffect(() => {
        getEvent();
    }, [state])

  return (
    <>
        {
            state &&
            <Modal>
                <ContainerModal>
                    <ContentCenter className='text-center'>
                        <img style={{display:"flex" ,maxWidth:"80%", maxHeight:"300px", margin:"0 auto"}} src={`${api}${event.image}`}  alt=''/>
                    </ContentCenter>

                    <h1 className='text-center'>{event.title}</h1>
                    <p className='text-justify'>{event.date}</p>
                    <p className='text-justify'>{event.description}</p>
                    

                    <Btnclose className='' onClick={()=>setState(false)}>Cerrar</Btnclose>
                </ContainerModal>
            </Modal>
        }
    </>
  )
}

export default SeeEvent


