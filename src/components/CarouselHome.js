import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';

const CarouselHome = ({array, type}) => {
    const navigate = useNavigate();
    // console.log(array)
  return (
    <Carousel variant="dark">
        {
            array.map(item => (
                <Carousel.Item>
                    {
                        item.images?
                        <img
                            className="d-block w-100"
                            src={`http://127.0.0.1:8000${item.images[0].url}`}
                            alt="First slide"
                        />:
                        <img
                            className="d-block w-100"
                            src={`http://127.0.0.1:8000${item.image}`}
                            alt="First slide"
                        />
                    }
                <Carousel.Caption>
                    {
                        type === 'event' &&
                        <h3 onClick={()=>navigate(`/event/${item.id}`)} className=''>{item.title}</h3>
                    }
                    {
                        type === 'publication' &&
                        <h3 onClick={()=>navigate(`/publication/${item.id}`)} className=''>{item.title}</h3>
                    }
                </Carousel.Caption>
                </Carousel.Item>
            ))
        }
  </Carousel>
  )
}

export default CarouselHome;