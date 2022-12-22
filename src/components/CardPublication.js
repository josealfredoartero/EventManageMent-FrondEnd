import React from 'react'
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { BtnLink } from '../elements/style';

const CardPublication = ({publication, button=true}) => {
    // console.log(publication);
  return (
    <Card style={{ width: '40rem', margin:"20px 0px" }}>
      <Carousel>
        {
            publication.images.map(item => (
                <Carousel.Item key={item.id}>
                    <img
                    className="d-block w-100"
                    src={`http://127.0.0.1:8000${item.url}`}
                    alt=""
                    />
                </Carousel.Item>
            ))
        }
    </Carousel>
      <Card.Body>
        <Card.Title>{publication.title}</Card.Title>
        <Card.Text>
            fecha: {publication.created_at.slice(0,10)}
        </Card.Text>
        <Card.Text>
          {publication.description}
        </Card.Text>
        {
            button &&
            <BtnLink to={`/publication/${publication.id}`} variant="primary">ver mas</BtnLink>
        }
      </Card.Body>
    </Card>
  )
}

export default CardPublication;