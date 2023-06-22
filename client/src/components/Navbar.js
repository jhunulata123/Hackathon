import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  }
  return (
    <div >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Learning Management System</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          {!localStorage.getItem('token') ? <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1 login2" role="button" to="/login" aria-disabled="true">Login</Link>
            <Link className="btn btn-primary mx-1 login2" role="button" to="/signup" aria-disabled="true">Signup</Link>
          </form> : <button className='btn btn-primary login2' onClick={handleLogout}> LogOut</button>}
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}

export default Header;