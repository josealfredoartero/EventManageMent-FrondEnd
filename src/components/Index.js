import React,{useContext,useEffect, useState}from 'react';
// import DataTable,{createTheme}from 'react-data-table-component';
import AuthContext from '../context/Auth';
import axios from 'axios';
import DataTables from './DataTables';
import {Containers} from '../elements/style';



const Index = () => {
  // const [state, setstate] = useState(initialState);
    const {header} = useContext(AuthContext)
    const Datos = [
      {
        id: 1,
        name:'jose artero',
        email:'jose@gmail.com',
      },
      {
        id: 2,
        name:'manuel aguilar',
        email:'manuel@gmail.com'
      },
      {
        id: 3,
        name:'alexander rodrigez',
        email:'alexander@gmail.com'
      },
      {
        id: 4,
        name:'kevin rodrigez',
        email:'alexander@gmail.com'
      },
      {
        id: 5,
        name:'marvin rodrigez',
        email:'alexander@gmail.com'
      },
      {
        id: 6,
        name:'edwin rodrigez',
        email:'alexander@gmail.com'
      },
      {
        id: 7,
        name:'manuel rodrigez',
        email:'alexander@gmail.com'
      },
      {
        id: 8,
        name:'enrique rodrigez',
        email:'alexander@gmail.com'
      },
      {
        id:9,
        name:'nahum rodrigez',
        email:'alexander@gmail.com'
      },
      {
        id: 10,
        name:'aldair rodrigez',
        email:'alexander@gmail.com'
      },
      {
        id: 11,
        name:'melvin rodrigez',
        email:'alexander@gmail.com'
      }
    ]

    const data = [
      {
        id:1,
        name:'jose Artero',
        email:'joseartero@gmail.com',
        edad:17,
        altura:170,
      },
      {
        id:2,
        name:'jose Manuel',
        email:'josemanuel@gmail.com',
        edad:19,
        altura:174,
      },
      {
        id:3,
        name:'Roberto',
        email:'Roberto@gmail.com',
        edad:27,
        altura:190,
      }
    ]

    const columns = [
      {
        name: 'ID',
        selector: row => row.id,
        sortable:true
      },
      {
        name: 'NAME',
        selector: row => row.name,
        sortable:true
      },
      {
        name: 'EMAIL',
        selector: row => row.email,
        sortable:true
      },
      // {
      //   name:'EDAD',
      //   selector: row => row.edad,
      //   sortable:true
      // },
      // {
      //   name:'ALTURA',
      //   selector: row => row.altura,
      //   sortable:true
      // },
      {
        name: 'OPCIONES',
        button:true,
        grow:2,
        cell: (row) => <button className='btn btn-warning' onClick={()=>addUser(row.id)} ></button>
      },
      {
        button:true,
        cell: (row) => <button className='btn btn-danger' onClick={()=>addUser(row.id)} >Eliminar</button>
      }
    ]

    const addUser = (id) => {
      alert(id)
    }

    const getpublications = async() => {
        axios.get("http://127.0.0.1:8000/api/publication",header)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
      
  return (
    <Containers>
      <div className='mt-3'>
        <DataTables title='Usuarios' columns={columns} data={Datos} />
      </div>
    </Containers>
  )
}

export default Index;