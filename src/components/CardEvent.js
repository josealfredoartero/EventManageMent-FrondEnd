import React from 'react';
import Card from 'react-bootstrap/Card';
// import Carousel from 'react-bootstrap/Carousel';
import { BtnLink } from '../elements/style';

const CardEvent = ({event, button=true}) => {
  return (
    <Card style={{ width: '40rem', margin:"20px 0px" }}>
    
        <img src={`http://127.0.0.1:8000${event.image}`} alt="" />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>
            fecha del evento: {event.date}
        </Card.Text>
        <Card.Text>
          {event.description}
        </Card.Text>
        {
            button &&
            <BtnLink to={`/event/${event.id}`} variant="primary">ver mas</BtnLink>
        }
      </Card.Body>
    </Card>
  )
}

export default CardEvent;