import styled from "styled-components";

import NavDropdown from "react-bootstrap/NavDropdown";

const Container = styled.div`
    width: 90%;
    height: auto;
    margin: 15px 10%;
    position: relative;
    --color:rgb(120, 120, 120);
`;

const LabelInput = styled.label`
    color: var(--color);
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 5px;
    transform: translateY(10px);
    transition: transform .5s, color .3s;
`;

const InputStyle = styled.input`
    background-color: black !important;
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
    color: #706c6c !important;
    padding: .6rem .3rem;
    border:none;
    outline: none;
    border-bottom: 1px solid var(--color);
    color:white !important;

    &:focus + label,
    &:not(:placeholder-shown) + label{
        transform: translateY(-12px) scale(.7);
        transform-origin: top left;
       --color:rgb(210, 210, 210);
    }
    &:-webkit-autofill{
        box-shadow: inset 0 0 0 32px black !important;
        -webkit-text-fill-color: white;
        caret-color: white;
    }
`;

const Errors = styled.p`
    font-size: 13px;
    color:red;
    margin: 0px;
    padding: 0px;
    left:0px;
`;

const ContainerForm = styled.div`
    width: 450px;
    min-height: 300px;
    max-height: 750px;
    text-align: center;
    margin: 5% auto;
    padding: 25px;
    border: 2px solid black;
    box-shadow: 2px 10px 10px 1px rgba(0, 0, 0, 0.5);
    background: black;
    border-radius: 13px;
    opacity: .85;

    .div{
        align-items: center;
        justify-content: center;
    }
`;

const Button = styled.button`
    padding: 5px 10px;
    margin: 10px 10px;
    color: white;
    background: ${props => props.color};
    border-radius: 5px;
    border: 0px;
`;

const Profile = styled.div`
  color: white;
  margin-right: 30px;
  display: flex;
  cursor: pointer;

  &:hover .items{
    display: block;
  }

  .items a, button{
    width: 100%;
    text-align: left;
    border: none;
    background: white;
    color:black;

    &:hover{
      background: white;
      color:black;
    }
  }
`;

const NameProfile = styled.p`
  margin: 10px 10px;
  font-size: 17px;
`;

const ImgProfile = styled.img`
  width: 40px;
  height: 40px;
  margin: 1px 5px;
  border-radius: 50%;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  color: black;
  top: 55px;
`;

const Logo = styled.img`
    margin: 0px;
    padding:0px;
    height: 45px;
    width: 150px;
    position: relative;
`;

const Containers = styled.div`
    margin-top: 70px;

`;

const Dropdown2 = styled(NavDropdown)`
  color: red;
`;

export {
    Container,
    LabelInput,
    InputStyle,
    Errors,
    ContainerForm,
    Button,
    Profile,
    NameProfile,
    ImgProfile,
    DropdownContent,
    Logo,
    Containers,
    Dropdown2
}