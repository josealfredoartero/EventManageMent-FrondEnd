import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react';
import {Containers} from '../elements/style';
import DataTables from './DataTables';
import * as Icon from 'react-bootstrap-icons';
import AuthContext from '../context/Auth';
import {useNavigate} from 'react-router-dom';
import ModalCreatePublication from './ModalCreatePublication';
import { Table } from 'react-bootstrap';
import ModalEditPublication from './ModalEditPublication';
import SeePublication from './SeePublication';

const PublicationManage = () => {

    const [publications, setPublications] = useState([]);
    const [createPublication, setCreatePublication] = useState(false);
    const [editPublication, setEditPublication] = useState(false);
    const [seePublication, setSeePublication] = useState(false);

    const [id, setId] = useState('')

    const {user} = useContext(AuthContext);
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
            // selector:row => row.images[0].url
            selector: row => <img src={`${AppUrl}${row.images[0].url}`} style={{width:"100px"}} alt='' />,
            width:"200px"
        },
        {
            name: "Opciones",
            cell: (row) => <><button onClick={()=>IdPublication(row.id)} title='Ver' className='btn btn-success' ><Icon.EyeFill /></button> |
                        <button onClick={()=>setEditPublication(true)} title='Editar' className='btn btn-warning'  ><Icon.PencilSquare /></button> |
                        <button title='Eliminar' className='btn btn-danger'  ><Icon.Trash /></button>
                        </> 
        }
    ];

    const IdPublication = (id) => {
        setId(id);
        setSeePublication(true);
    }

    useEffect(() => {
        if(user === '' && user.id_role !== 1){
            navigate('/')
        }
        getPublications();
    }, [user]);

  return (
    <Containers className='container'>
        <h1 className='text-center'>Lista de Publicaciones</h1>
        <button onClick={() => setCreatePublication(true)} className='btn btn-success'>Agregar Nueva Publicaion</button>
        <DataTables title='Publicaciones' columns={columns} data={publications}/>

        <SeePublication state={seePublication} setState={setSeePublication} id={id}/>
        <ModalEditPublication state={editPublication}/>
        <ModalCreatePublication state={createPublication} setState={setCreatePublication} />
        {/* <Table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Usuario</th>
                    <th>Imagenes</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    publications.map(element => (
                        <tr>
                            <td>{element.title}</td>
                            <td style={{width:"500px"}}>{element.description.substr(0,250)}{element.description.length > 250 && "..."}</td>
                            <td>{element.name}</td>
                            <td><img src={`${AppUrl}${element.images[0].url}`} alt="" style={{width:"100px"}}/> </td>
                            <td>
                                <button title='Ver' className='btn btn-success' ><Icon.EyeFill /></button>|
                                <button title='Editar' className='btn btn-warning' ><Icon.PencilSquare /></button>|
                                <button title='Eliminar' className='btn btn-danger' ><Icon.PencilSquare /></button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table> */}
    </Containers>
  )
}

export default PublicationManage;