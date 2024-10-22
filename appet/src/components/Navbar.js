import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/css/App.css'; // importar estilo  

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove o token de acesso do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        // Redireciona para a página de login
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/MyPets">Pet</Link></li>
                <li><Link to="/marketplace">Marketplace</Link></li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
