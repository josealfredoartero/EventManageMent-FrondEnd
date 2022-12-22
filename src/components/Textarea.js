import React from 'react';
import { Container, InputTextArea } from '../elements/style';


const Textarea = ({label, state, setState, value=''}) => {

    const handleChange = (e)=>{
        setState(e.target.value);
    }

  return (
    <Container>
        <label htmlFor={label}>{label}:</label>
        <InputTextArea id={label} value={state} onChange={handleChange} />
    </Container>
  )
}

export default Textarea;