import React,{ useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import * as Icon from 'react-bootstrap-icons';
import { Option } from '../elements/style';
import AuthContext from '../context/Auth';
import axios from 'axios';



const Comments = ({comment, refresh}) => {
    const {user, header} = useContext(AuthContext);
    const [editComment, setEditComment] = useState(false);
    const [description, setDescription] = useState('');

    const deleteComment = async(e)=>{
        e.preventDefault();
        if(comment.id_publication){
            await axios.delete(`http://127.0.0.1:8000/api/publication/comment/${comment.id}`,header)
            .then(response => {
                // console.log(response);
                refresh()
            })
            .catch(error => console.log(error))
        }else if(comment.id_event){
            await axios.delete(`http://127.0.0.1:8000/api/event/comment/${comment.id}`,header)
            .then(response => {
                // console.log(response);
                refresh()
            })
            .catch(error => console.log(error))
        }
    }

    const updateComment = async() => {
        if(comment.id_publication){
            await axios.put(`http://127.0.0.1:8000/api/publication/comment/${comment.id}`,{
                description:description
            },header)
            .then(response => {
                refresh();
                setEditComment(false);
            })
            .catch(error => console.log(error))
        }else if(comment.id_event){
            await axios.put(`http://127.0.0.1:8000/api/event/comment/${comment.id}`,{
                description:description
            },header)
            .then(response => {
                refresh();
                setEditComment(false);
            })
            .catch(error => console.log(error))
        }
    }

  return (
    <Card className='mt-1'>
      <Card.Header>{comment.user} 
        <Option>
            {
                comment.id_user === user.id &&
                <button onClick={()=>{setEditComment(true); setDescription(comment.description)}} className='btn btn-warning'><Icon.PencilSquare /></button>
            }{
                (comment.id_user === user.id || user.id === 1) &&
                <button onClick={deleteComment} className='btn btn-danger'><Icon.Trash /></button>
            }
        </Option>
      </Card.Header>
        {
            editComment?
        <Card.Body>
            <input value={description} onChange={(e)=>setDescription(e.target.value)} />
            <button onClick={updateComment}>Modificar</button>
            <button onClick={()=>setEditComment(false)}>cancelar</button>
        </Card.Body>:
      <Card.Body>
        <Card.Title>{comment.description}</Card.Title>
        <Card.Text>
            {comment.created_at.slice(11,19)} {comment.created_at.slice(0,10)} 
        </Card.Text>
      </Card.Body>
      
        }
    </Card>
  )
}

export default Comments;