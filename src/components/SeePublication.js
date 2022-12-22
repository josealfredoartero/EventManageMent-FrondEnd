import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { Modal,ContainerModal, Btnclose } from '../elements/style';
import { UrlApi, api } from '../hooks/encodeBase64';

const SeePublication = ({state, setState, id}) => {

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
    }, [state])
    


  return (
    <>
        {
            state &&
            <Modal>
                <ContainerModal >
                    <h1 className='text-center'>{publication.title}</h1>
                    <img style={{display:"flex" ,maxWidth:"80%", maxHeight:"300px", margin:"0 auto"}} src={`${api}${image}`}  alt=''/>
    
                    <div className='container text-center mt-3'>
                        {
                            publication.images && 
                            publication.images.map(item => (
                                <img key={item.id} onClick={()=>setImage(item.url)} style={{height:"70px", marginRight:"10px"}} src={`${api}${item.url}`} alt='' />
                            ))
                        }
                    </div>

                    <p className='text-justify'>{publication.description}</p>
                    <Btnclose onClick={()=>setState(false)}>cerrar</Btnclose>
                </ContainerModal>
            </Modal>
        }
    </>
  )
}

export default SeePublication;
