import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { Modal,ContainerModal } from '../elements/style';
import { UrlApi, api } from '../hooks/encodeBase64';

const SeePublication = ({state, setState, id=null}) => {

    const [publication, setPublication] = useState([]);
    const [image, setImage] = useState('#')

    const getPublication = async() => {
        await axios.get(`${UrlApi}publication/${id}`)
        .then(response => {
            console.log(response);
            setPublication(response.data);
            setImage(response.data.images[0].url)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getPublication();
    }, [id])
    


  return (
    <>
        {
            state &&
            <Modal>
                <ContainerModal>
                    <img style={{maxWidth:"80%", margin:"0px 10%"}} src={`${api}${image}`}  alt=''/>
    
                    <div className='container text-center mt-3'>
                        {
                            publication.images && 
                            publication.images.map(item => (
                                <button onClick={()=>setImage(item.url)}><img style={{height:"80px"}} src={`${api}${item.url}`} alt='' /></button>
                            ))
                        }
                    </div>

                    <h1 className='text-center'>{publication.title}</h1>
                    <p className='text-justify'>{publication.description}</p>
                    <button onClick={()=>setState(false)}>cerrar</button>
                </ContainerModal>
            </Modal>
        }
    </>
  )
}

export default SeePublication;