import axios from 'axios'
import React, {useEffect, useState} from 'react'
import CardPublication from './CardPublication';
import { ContentCenter } from '../elements/style';


const Publications = () => {

    const [publications, setPublications] = useState([])

    const getPublications = async() => {
        await axios.get("http://127.0.0.1:8000/api/publication")
        .then(response =>{
            console.log(response)
            setPublications(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
      getPublications();
    }, [])
    
  return (
    <div className="">
        <ContentCenter className=''>
            {
                publications.map(item => (
                    <CardPublication key={item.id}  publication={item}/>
                ))
            }
        </ContentCenter>
    </div>
  )
}

export default Publications;