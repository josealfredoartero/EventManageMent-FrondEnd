import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react';
import {Containers} from '../elements/style';
import DataTables from './DataTables';
import AuthContext from '../context/Auth';
import {useNavigate} from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

import ModalCreateEvent from './ModalCreateEvent';
import SeeEvent from './SeeEvent';
import ModalEditEvent from './ModalEditEvent';

const EventManage = () => {

    const [modalCreate, setModalCreate] = useState(false);

    const [id, setId] = useState('')
    // const [createEvent, setCreateEvent] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const [seeEvent, setSeeEvent] = useState(false);


    const [ events, setEvents ] = useState([]);

    const AppUrl = "http://127.0.0.1:8000";

    const getEvents = async() => {
        await axios.get("http://127.0.0.1:8000/api/events")
        .then(response => {
            console.log(response);
            setEvents(response.data);
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
            name:"Date",
            selector: row => row.date,
            sortable:true,
        },
        {
            name:"Imagen",
            // selector:row => row.images[0].url
            selector: row => <img src={`${AppUrl}${row.image}`} style={{width:"100px"}} alt='' />,
            width:"200px"
        },
        {
            name: "Opciones",
            cell: (row) => <><button onClick={()=>IdEvent(row.id,'see')} title='Ver' className='btn btn-success' ><Icon.EyeFill /></button> |
                        <button onClick={()=>IdEvent(row.id,'edit')} title='Editar' className='btn btn-warning'  ><Icon.PencilSquare /></button> |
                        <button onClick={()=>deleteEvent(row.id)} title='Eliminar' className='btn btn-danger'  ><Icon.Trash /></button>
                        </> 
        }
    ];
    useEffect(()=>{
        getEvents();
    },[])

    const IdEvent = (id, option) => {
        setId(id);
        if (option === 'see') {
            setSeeEvent(true);
        }else if (option === 'edit'){
            setEditEvent(true);
        }
    }

    const {header} = useContext(AuthContext)
    
    const deleteEvent = async(id) => {
        await axios.delete(`http://127.0.0.1:8000/api/events/${id}`,header)
        .then(response =>{
            console.log(response);
            if (response.status === 200) {
                getEvents();
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }
  return (
    <Containers className='container'>

        <h1 className='text-center'>Lista de Eventos</h1>
        <button onClick={()=>setModalCreate(true)} className='btn btn-success'>Agregar Nuevo Evento</button>
        <DataTables title='Eventos' columns={columns} data={events}/>

        <SeeEvent state={seeEvent} setState={setSeeEvent} id={id}/>
        <ModalCreateEvent refresh={getEvents} state={modalCreate} setState={setModalCreate}/>
        <ModalEditEvent state={editEvent} setState={setEditEvent} id={id}/>
        
    
    </Containers>
  )
}

export default EventManage