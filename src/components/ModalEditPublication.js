import axios from 'axios';
import React,{useState, useEffect, useContext} from 'react';
import { Modal, ContainerModal, ConImg } from '../elements/style';
import Input from './Input';
import InputFile from './InputFile';
import Textarea from './Textarea';
import * as Icon from 'react-bootstrap-icons';
import AuthContext from '../context/Auth';
import {  toast } from 'react-toastify';

const ModalEditPublication = ({state, setState, id, refresh}) => {
    const {header} = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imagesDelete, setImagesDelete] = useState([]);
    // const [addImage, setAddImage] = useState([]);

    const getPublication = async() => {
        await axios.get(`http://127.0.0.1:8000/api/publication/${id}`)
        .then(response => {
            // console.log(response);
            setTitle(response.data.title)
            setDescription(response.data.description)
            setImages(response.data.images)
        })
        .catch(error => console.log(error))
    }

    const deleteImg = (image) =>{
        if(image.id){
            setImagesDelete(imagesDelete => [...imagesDelete, image])
            for(let i=0; i < images.length; i++){
                if(images[i].id === image.id){
                    images.splice(i, 1);
                    if(images.length === 0){
                        setImages([]);
                        break;
                    }
                    setImages([...images])
                    break;
                }
            }
        }else{
            for (let i = 0; i < images.length; i++) {
                if (images[i].img === image) {
                images.splice(i, 1);
                if(images.length === 0){
                    setImages([]);
                    break;
                }
                setImages([...images])
                break;
                }
            }
        }
    }

    const sendPublication = async(e) => {
        e.preventDefault();
        let imagesSave = [];
        images.forEach(img => {
            if(!img.id){
                imagesSave.push(img)
            }
        })
        await axios.put(`http://127.0.0.1:8000/api/publication/${id}`,{
            title:title,
            description:description,
            images:{
                addImages:imagesSave,
                deleteImages:imagesDelete
            }
        }, header)

        .then(response => {
            console.log(response);
            if(response.status === 200){
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                  });
                refresh();
                setState(false)
            }
        })
        .catch(error => {
            console.log(error)
            toast.error("Error !!!", {
                position: toast.POSITION.TOP_RIGHT
              });
        })

    }

    const cleanData = () =>{
        setTitle('');
        setDescription('');
        setImages([]);
        setImagesDelete([]);
    }

    useEffect(() => {
        cleanData();
        getPublication()
    }, [state]);

  return (
    <>
        {
            state && 
            <Modal>
                <ContainerModal bg="dark">
                   <h1 className='text-center'>Editar Publicación</h1>
                    <form>
                        <Input label="titulo" state={title} setState={setTitle}/>
                        <Textarea label="descripcion" state={description} setState={setDescription} />
                        <InputFile images={images} setImages={setImages} multiple={true}/>
                    </form>
                    <ConImg>
                            {
                                images &&
                                images.map(item => (
                                    item.id?
                                    <div key={item.id}>
                                        <img style={{height:"60px"}} src={`http://127.0.0.1:8000${item.url}`} alt=''/>
                                        <Icon.XCircle onClick={()=>deleteImg(item)}/>
                                    </div>:
                                    <div key={item.name}>
                                        <img style={{height:"60px"}} src={item.img} alt=''/>
                                        <Icon.XCircle onClick={()=>deleteImg(item.img)}/>
                                    </div>
                                ))
                            }
                        </ConImg>
                    <div className='text-center'>
                        <button onClick={sendPublication} className='btn btn-success me-3'>Enviar</button>
                        <button onClick={()=>setState(false)} className='btn btn-danger'>Cancelar</button>
                    </div>
                </ContainerModal>
            </Modal>
        }
    </>
  )
}

export default ModalEditPublication;