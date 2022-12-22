import React from 'react';
import { Container, Errors, InputTextArea } from '../elements/style';


const Textarea = ({label, state, setState, error}) => {

    const handleChange = (e)=>{
        setState(e.target.value);
    }

  return (
    <Container>
        <label htmlFor={label}>{label}:</label>
        <InputTextArea id={label} value={state} onChange={handleChange} />
        {error && <Errors>*{error}</Errors>}
    </Container>
  )
}

export default Textarea;