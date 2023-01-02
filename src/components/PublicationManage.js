import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react';
import {Containers} from '../elements/style';
import DataTables from './DataTables';
import * as Icon from 'react-bootstrap-icons';
import AuthContext from '../context/Auth';
import {useNavigate} from 'react-router-dom';
import ModalCreatePublication from './ModalCreatePublication';
import ModalEditPublication from './ModalEditPublication';
import SeePublication from './SeePublication';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PublicationManage = () => {

    const [publications, setPublications] = useState([]);
    const [createPublication, setCreatePublication] = useState(false);
    const [editPublication, setEditPublication] = useState(false);
    const [seePublication, setSeePublication] = useState(false);

    const [id, setId] = useState('')

    const {user, header} = useContext(AuthContext);
    const navigate = useNavigate();

    const AppUrl = "http://127.0.0.1:8000";

    const getPublications = async() => {
        await axios.get("http://127.0.0.1:8000/api/publication")
        .then(response => {
            console.log(response);
            if(response.status === 200){
                setPublications(response.data);
            }
        })
        .catch(error => console.log(error))
    }

    const columns = [
        {
            name: "Titulo",
            selector: row => row.title,
            sortable:true
        },
        {
            name:"Descripcion",
            selector: row => row.description,
            sortable:true,
            width: '300px',
        },
        {
            name:"Usuario",
            selector: row => row.name,
            sortable:true,
        },
        {
            name:"Imagenes",
            selector: row => <img src={`${AppUrl}${row.images[0].url}`} style={{width:"100px"}} alt='' />,
            width:"200px"
        },
        {
            name: "Opciones",
            cell: (row) => <><button onClick={()=>IdPublication(row.id,'see')} title='Ver' className='btn btn-success' ><Icon.EyeFill /></button> |
                        <button onClick={()=>IdPublication(row.id,'edit')} title='Editar' className='btn btn-warning'  ><Icon.PencilSquare /></button> |
                        <button onClick={()=>deletePublication(row.id)} title='Eliminar' className='btn btn-danger'  ><Icon.Trash /></button>
                        </> 
        }
    ];

    const IdPublication = (id, option) => {
        setId(id);
        if(option === 'see'){
            setSeePublication(true);
        }else if(option === 'edit'){
            setEditPublication(true)
        }
    }

    const deletePublication = async(id) => {
        await axios.delete(`http://127.0.0.1:8000/api/publication/${id}`,header)
        .then(response =>{
            if(response.status === 200){
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                  });
                getPublications();
            }
        })
        .catch(error => {
            // console.log(error);
        })
    }

    useEffect(() => {
        if(user === '' && user.id_role !== 1){
            navigate('/')
        }
        getPublications();
    }, [user]);

  return (
    <Containers className='container'>
          <ToastContainer />
        <h1 className='text-center'>Lista de Publicaciones</h1>
        <button onClick={() => setCreatePublication(true)} className='btn btn-success'>Agregar Nueva Publicaion</button>
        <DataTables title='Publicaciones' columns={columns} data={publications}/>

        <SeePublication state={seePublication} setState={setSeePublication} id={id}/>
        <ModalCreatePublication state={createPublication} setState={setCreatePublication} refreshData={getPublications} />
        <ModalEditPublication state={editPublication} setState={setEditPublication} id={id} refresh={getPublications}/>
    </Containers>
  )
}

export default PublicationManage;