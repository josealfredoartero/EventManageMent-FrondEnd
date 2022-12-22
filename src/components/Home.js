import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { ContentCenter } from '../elements/style';
import CarouselHome from './CarouselHome';
import Publications from './Publications';

const Home = () => {

    const [publications, setPublications] = useState([]);

    const [events, setEvents] = useState([]);

    const getpublications = async() => {
        axios.get("http://127.0.0.1:8000/api/publication/latest")
        .then(response => {
            setPublications(response.data)
        })
        .catch(error => console.log(error))
    }

    const getEvents = async() => {
        axios.get("http://127.0.0.1:8000/api/events/latest")
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getpublications();
        getEvents();
    }, []);
  return (
    <div className='container'>
        <div className="col-6 mt-4">
            <h3>¿Quienes Somos?</h3>
            <p>una aplicacion web que ayudara a manejar los eventos y las publicaciones de una forma mas
                ordenada y facil de manejar
            </p>
        </div>
        <div>
            <h2>Eventos</h2>
            <ContentCenter>
                <CarouselHome array={events} />
            </ContentCenter>
        </div>
        <div className='mt-5'>
            <h2>Publicaciones</h2>
            <ContentCenter>
                <CarouselHome array={publications} />
            </ContentCenter>
        </div>
    </div>
  )
}

export default Home;