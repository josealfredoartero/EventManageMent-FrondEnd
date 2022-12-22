import React,{useState, useEffect} from 'react';
import AuthContext from "../context/Auth";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ContentCenter } from '../elements/style';
import CardEvent from './CardEvent';



const Events = () => {

    const [events, setEvents] = useState([]);

    const getEvents = async() => {
        await axios.get(`http://127.0.0.1:8000/api/events`)
        .then(response => {
            console.log(response);
            setEvents(response.data)
        })
        .catch(error =>console.error())
    }

    useEffect(() => {
        getEvents();
      }, [])

  return (
    <div>
        <ContentCenter>
            {
                events.map(item => (
                    <CardEvent key={item.id} event={item} />
                ))
            }
        </ContentCenter>
    </div>
  )
}

export default Events;