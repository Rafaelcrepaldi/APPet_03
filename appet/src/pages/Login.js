import { useState, useContext } from 'react';
import { Context } from '../ContextStore';
import { loginUser } from '../services/userData';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import SimpleSider from '../components/Siders/SimpleSider';

function Login() {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { setUserData } = useContext(Context);
    const navigate = useNavigate();

    const handleChanges = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        loginUser(user)
            .then(res => {
                if (!res.error) {
                    // Salva o token no localStorage
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('userId', res.id);
                    
                    // Armazena as informações do usuário no contexto
                    setUserData(res.user);

                    // Redireciona o usuário após o login bem-sucedido
                    navigate('/');
                    window.location.reload();

                } else {
                    setLoading(false);
                    setError(res.error.message);
                    setAlertShow(true);
                }
            })
            .catch(err => {
                console.error('Erro no login:', err);
                setLoading(false);
                setError('Ocorreu um erro ao tentar realizar o login. Tente novamente.');
                setAlertShow(true);
            });
    };

    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Entrar</h1>
                <Form className="col-lg-6" onSubmit={handleSubmitLogin}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>{error}</p>
                        </Alert>
                    }
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Endereço de Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Digite seu email" onChange={handleChanges} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Senha" onChange={handleChanges} required />
                    </Form.Group>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled>
                            Aguarde... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Entrar</Button>
                    }
                    <p className="bottom-msg-paragraph">Não tem uma conta? <Link to="/auth/register">Cadastre-se</Link>!</p>
                </Form>
            </div>
        </>
    );
}

export default Login;