import React from 'react';
import { Modal, ContainerModal } from '../elements/style';

const ModalEditPublication = ({state}) => {
  return (
    <>
        {
            state && 
            <Modal>
                <ContainerModal>
                    <form>
                        <div>
                            <label>agregar</label>
                            <input type="text" /> 
                        </div>
                    </form>
                </ContainerModal>
            </Modal>
        }
    </>
  )
}

export default ModalEditPublication;