import React, {useState} from 'react'
import { ContainerModal, Modal } from '../elements/style'
import Input from './Input'
import InputFile from './InputFile';
import Textarea from './Textarea';

const ModalCreatePublication = ({state, setState}) => {

    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);

  return (
    <>
        {state &&
            <Modal>
                <ContainerModal bg='dark' >
                    <h1 className='text-center'>Crear Publicacion</h1>
                    <form>
                        <Input label="Titulo" state={title} setState={setTitle} />
                        <Textarea label="Descripcion" />
                        <InputFile images={images} setImages={setImages}  multiple={true} />
                        <div>
                            {
                                images.map(item => (
                                    <img src={images.img} alt=''/>
                                ))
                            }
                        </div>
                        <div className='text-center'>
                            <button className="btn btn-success me-2">Enviar</button>
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