import axios from 'axios';
import React,{useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/Auth';
import { ContentCenter } from '../elements/style';
import CardEvent from './CardEvent';
import Comments from './Comments';


const Event = () => {

    const {id} = useParams();
    const {user, header} = useContext(AuthContext);
    const [event, setEvent] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const getEvent = async() => {
        await axios.get(`http://127.0.0.1:8000/api/events/${id}`)
        .then(response => {
            setEvent(response.data)
        })
        .catch(error =>console.log(error))
    }

    const getComments = async() => {
        await axios.get(`http://127.0.0.1:8000/api/event/comments/${id}`)
        .then(response => {
            setComments(response.data);
        })
        .catch(error =>console.log(error))
    }

    const sendComment = async(e) => {
        e.preventDefault();
        await axios.post(`http://127.0.0.1:8000/api/event/comment`,{
            description: comment,
            id_event: id
        },header)
        .then(response =>{
            getComments();
            setComment('')
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getEvent();
        getComments();
    }, []);

  return (
    <ContentCenter>
        {
            event.id &&
            <CardEvent event={event} button={false} />
        }
        <div>
            <h4>Comentarios:</h4>
            {
              user.id &&
              <div className='mt-2 mb-2'>
                <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Agregar Comentario...' />
                <button className='' onClick={sendComment}>Comentar</button>
              </div>
            }
            {
              comments.map(item => (
                <Comments key={item.id} comment={item} refresh={getComments} />
              ))
            }
          </div>
    </ContentCenter>
  )
}

export default Event;