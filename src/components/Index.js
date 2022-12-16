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
        cell: (row) => <button className='btn btn-warning' onClick={()=>addUser(row.id)} >Editar</button>
      },
      {
        button:true,
        cell: (row) => <button className='btn btn-danger' onClick={()=>addUser(row.id)} >Eliminar</button>
      }
    ]

    const addUser = (id) => {
      alert(id)
    }

    const publicaciones = async() => {
        axios.get("http://127.0.0.1:8000/api/publication",header)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
      
  return (
    <Containers>
      <div className='mt-3'>
        <DataTables title='Usuarios' columns={columns} data={Datos} />
        <button onClick={publicaciones}>click</button>
      </div>
      <div className='container'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non pretium metus, eu auctor neque. Pellentesque augue nunc, pellentesque a mauris a, mattis commodo arcu. Vestibulum aliquet placerat euismod. Nam mollis mi nec congue cursus. Vivamus rhoncus dolor vel lorem pellentesque porttitor. Vestibulum risus lectus, volutpat vel tortor id, luctus interdum libero. Nunc accumsan mollis nibh, id maximus metus elementum nec. Proin vitae placerat ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce facilisis congue felis posuere tincidunt. Sed ornare, enim at consequat tincidunt, eros metus ultrices nibh, in finibus magna purus a eros. Sed nec lorem massa. Aliquam erat volutpat. Vestibulum malesuada orci magna, nec pretium nisi interdum at.

Quisque quis justo in est suscipit tristique sed ut velit. Nulla eleifend ante metus, vel euismod nisl condimentum sed. Aliquam justo odio, pharetra vitae ultrices non, tristique congue lectus. Aenean tempor id ipsum et ultricies. Phasellus malesuada eleifend justo, quis interdum lacus. Donec hendrerit ex quis dui efficitur, a volutpat elit sagittis. Pellentesque eget tortor maximus, congue turpis ac, convallis odio. Integer eleifend, mi sit amet pulvinar porttitor, quam tortor bibendum velit, et porta elit nunc sed enim. Aliquam aliquam dolor lacus, ac vehicula ante fringilla at. Curabitur mollis mattis tellus, sit amet vestibulum orci.

Nunc sed venenatis dui. Fusce posuere turpis et neque dignissim, nec bibendum orci suscipit. Etiam dapibus nunc est, at pulvinar elit sagittis in. Donec laoreet, justo in vehicula vulputate, velit velit porta est, id egestas tortor ex non mauris. Praesent nec diam ipsum. Aliquam pharetra pulvinar elit at scelerisque. Nam elit urna, accumsan at viverra sed, maximus id odio. Nunc volutpat, risus sed blandit posuere, mi lorem convallis odio, vel vulputate felis quam id nunc. Praesent sit amet lacinia tellus. Duis ut venenatis nibh, ac tristique justo. Nullam consequat sapien a mi lacinia, et rutrum orci gravida.

Cras dictum posuere libero. Mauris fermentum pellentesque mollis. Curabitur eget magna et augue interdum vulputate. Aliquam sollicitudin porttitor ipsum, eu pharetra mauris suscipit nec. Cras vel leo mauris. Nunc sollicitudin scelerisque turpis, ut facilisis sapien vehicula id. Phasellus egestas, velit quis vehicula ullamcorper, nunc nulla condimentum enim, sagittis scelerisque lorem dolor non tellus. Aliquam nec elementum tortor. Nulla eget sodales tortor. Maecenas a ligula sit amet mi aliquam dignissim eu nec odio. Donec pretium turpis ut orci pulvinar hendrerit. Vestibulum eget lacus vel sapien sodales interdum nec vestibulum augue. Proin aliquet quis lorem ut vestibulum. Fusce molestie vulputate malesuada.

Sed volutpat purus diam, eu ullamcorper leo dignissim in. Aenean consequat purus at est sollicitudin lacinia. Ut dapibus bibendum volutpat. Suspendisse a diam ut ante congue varius. Integer ac nunc non ligula rhoncus viverra. Vivamus vitae ante leo. Nunc sodales diam ut vehicula commodo. Duis bibendum sodales mauris ut rutrum. Praesent non molestie turpis, non volutpat mauris.

Generated 5 paragraphs, 464 words, 3160 bytes of Lorem Ipsum
      </div>
    </Containers>
  )
}

export default Index;