import axios from 'axios';
import React,{useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';
import { ContentCenter } from '../elements/style';
import CardPublication from './CardPublication';
import AuthContext from "../context/Auth";
import Comments from './Comments';


const Publication = () => {

    const {id} = useParams();
    const {user, header} = useContext(AuthContext);

    const [publication, setPublication] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const getPublication = async() => {
        await axios.get(`http://127.0.0.1:8000/api/publication/${id}`)
        .then(response => {
            console.log(response);
            setPublication(response.data);
        })
        .catch(error => console.log(error))
    }

    const getComments = async() => {
      await axios.get(`http://127.0.0.1:8000/api/publication/comments/${id}`)
      .then(response => {
        setComments(response.data)
      })
      .catch(error => console.log(error))
    }

    const sendComment = async(e) =>{
      e.preventDefault();
      setComment("");
      if(user.id){
        await axios.post(`http://127.0.0.1:8000/api/publication/comment`,{
          description:comment,
          id_publication:id
        },header)
        .then(response => {
          getComments();
        })
        .catch(error => console.log(error))
      }
    }

    useEffect(() => {
      getPublication()
      getComments();
    }, [])

  return (
    <ContentCenter className='container'>
        {
            publication.id &&
            <CardPublication publication={publication} button={false}/>
        }
        {
          comments!==[] && 
          <div>
            <h4>Comentarios:</h4>
            {
              user.id &&
              <div className='mt-2 mb-2'>
                <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Agregar Comentario...' />
                <button onClick={sendComment}>Comentar</button>
              </div>
            }
            {
              comments.map(item => (
                <Comments key={item.id} comment={item} refresh={getComments} />
              ))
            }
          </div>
        }
    </ContentCenter>
  )
}

export default Publication;