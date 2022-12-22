import React, {useState, useContext, useEffect} from 'react'
import { ContainerModal, Modal, ConImg } from '../elements/style'
import Input from './Input'
import InputFile from './InputFile';
import Textarea from './Textarea';
import * as Icon from 'react-bootstrap-icons';
import axios from 'axios';
import AuthContext from '../context/Auth';

const ModalCreatePublication = ({state, setState, refreshData}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const {header} = useContext(AuthContext);


    const deleteImg = (image) =>{
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

      const cleanData = () =>{
        setTitle('');
        setDescription('');
        setImages([]);
      }

      const savePublication = async(e) =>{
        e.preventDefault();
        await axios.post("http://127.0.0.1:8000/api/publication",{
            title:title,
            description:description,
            images:images
        },header)
        .then(response => {
            console.log(response)
            if(response.status === 200){
                refreshData();
                setState(false);
            }
        })
        .catch(error => console.log(error))
      }

      useEffect(() => {
        cleanData();
      }, [state]);

  return (
    <>
        {state &&
            <Modal>
                <ContainerModal bg="dark" >
                    <h1 className='text-center'>Crear Publicacion</h1>
                    <form>
                        <Input label="Titulo" state={title} setState={setTitle} />
                        <Textarea state={description} setState={setDescription} label="Descripcion" />
                        <InputFile images={images} setImages={setImages}  multiple={true} />
                        <ConImg>
                            {
                                images.map(item => (
                                    <div key={item.name}>
                                        <img style={{height:"70px"}} src={item.img} alt=''/>
                                        <Icon.XCircle onClick={()=>deleteImg(item.img)}/>
                                    </div>
                                ))
                            }
                        </ConImg>
                        <div className='text-center'>
                            <button className="btn btn-success me-2" onClick={savePublication}>Enviar</button>
                            <button className='btn btn-danger' onClick={()=>setState(false)}>Cancelar</button>
                        </div>
                    </form>
                </ContainerModal>
            </Modal>
        }
    </>
  )
}

export default ModalCreatePublication