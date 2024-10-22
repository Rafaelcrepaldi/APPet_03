import { useNavigate } from 'react-router-dom';

function LogOut() {
    const navigate = useNavigate(); // Substitui o uso de history por useNavigate

    fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST', // Use o método correto, caso necessário (POST é comum para logout)
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        // Remove o token de autenticação armazenado
        localStorage.removeItem('accessToken');
        
        // Redireciona para a página inicial
        navigate('/');
    })
    .catch(err => console.log(err));
}

export default LogOut;
