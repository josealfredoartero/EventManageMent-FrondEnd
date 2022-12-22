import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselHome = ({array}) => {
    console.log(array)
  return (
    <Carousel>
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
                    <h3 className='text-dark'>{item.title}</h3>
                </Carousel.Caption>
                </Carousel.Item>
            ))
        }
  </Carousel>
  )
}

export default CarouselHome;