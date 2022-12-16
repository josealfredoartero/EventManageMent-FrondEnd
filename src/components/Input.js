import React from 'react';
import {Container,LabelInput,InputStyle,Errors} from '../elements/style';

const Input = ({label="prueba", type="text", state, setState, error=null}) => {
  return (
    <Container>
        <InputStyle type={type} id={label} value={state} onChange={(e)=>setState(e.target.value)} 
        placeholder=' ' autocomplete="off"/>
        <LabelInput htmlFor={label}>{label}:</LabelInput>
        {error && <Errors>*{error}</Errors>}
    </Container>
  )
}

export default Input;

// const color = '#5757577e';

