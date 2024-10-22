import { useContext, useEffect } from 'react';
import { Context } from '../../ContextStore';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';

import './Header.css';

function Header() {
    const { userData, setUserData } = useContext(Context);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:4000/api/auth/protected-route', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUserData(data.user);
                }
            })
            .catch(err => console.error("Erro ao buscar dados do usuário:", err));
        }
    }, [setUserData]);

    return (
        <Navbar collapseOnSelect bg="light" variant="light" expand="lg" className="header-navbar">
            <div className="container">
                <Navbar.Brand>
                    <NavLink className="navbar-brand" to="/">APPet</NavLink> {/* Nome mais direto */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {userData ? (
                            <>
                                <NavLink className="nav-item nav-link" to="/add-product">
                                    Adicionar Produto
                                </NavLink>
                                <NavLink className="nav-item nav-link" to="/marketplace">
                                    Marketplace
                                </NavLink>
                                <NavLink className="nav-item nav-link" to="/mypets">
                                    MyPets
                                </NavLink>
                                <NavDropdown title={<img id="navImg" src={userData.avatar} alt="user-avatar" />} id="collasible-nav-dropdown">
                                    <NavLink className="dropdown-item" to={`/profile/${userData._id}`}>
                                        Perfil
                                    </NavLink>
                                    <NavDropdown.Divider />
                                    <NavLink className="dropdown-item" to="/auth/logout" onClick={() => {
                                        localStorage.removeItem('token');
                                        setUserData(null);
                                    }}>
                                        <IoLogOut /> Sair
                                    </NavLink>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <NavLink className="nav-item nav-link" to="/auth/login">
                                    Entrar
                                </NavLink>
                                <NavLink className="nav-item nav-link" to="/auth/register">
                                    Registrar
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default Header;
