import React,{useEffect, useContext}from "react";
// import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import {Profile,NameProfile,ImgProfile,DropdownContent,Logo} from "../elements/style";
import AuthContext from "../context/Auth";

const Navbars = () => {
  const { user, logout} = useContext(AuthContext);

  useEffect(() => {
    
  }, [])
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-1">
      <Link to='/'>
        <Logo src='/img/logo1.png' alt='logo'/>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          <Link className="btn btn-dark bg-dark" to="/events">
            Eventos
          </Link>
          <Link className="btn btn-dark bg-dark" to="/publications">
            Publicaciones
          </Link>
          {
            user.id_role === 1 && 
              <NavDropdown title="Administrar" id="collasible-nav-dropdown" className="bg-dark text-light">
                <Link className="btn" to="manage/events">Eventos</Link>
                <Link className="btn" to="manage/publications">
                  Publicaciones
                </Link>
                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
          }
        </Nav>
      {
        user? 
        <Profile>
          <NameProfile>{user.name}</NameProfile>
          <ImgProfile
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt=""
          />
          <DropdownContent className='items'>
            <Link to='/profile' className="btn btn-white">Perfil</Link>
            <Button onClick={logout} className="btn btn-white">cerrar cecion</Button>
          </DropdownContent>
        </Profile>:
        <Nav>
          <Link className="btn btn-dark bg-dark" to="/login">
            Iniciar Secicion
          </Link>
          <Link className="btn btn-dark bg-dark" to="/register">
            Registarse
          </Link>
        </Nav>
      }
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navbars;
