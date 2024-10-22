import React, { useState } from 'react';
import { Form, Button, Col, Spinner, Alert, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import { registerUser } from '../services/userData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/Register/Register.css';

function Register() {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        name: null,
        email: null,
        password: "",
        phone: '',
        gender: null,
    });

    const navigate = useNavigate(); // Inicializar o useNavigate

    const handleChanges = (e) => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmitReg = (e) => {
        e.preventDefault();
        setLoading(true);
        registerUser(userData)
            .then(res => {
                if (!res.error) {
                    navigate('/auth/login');
                } else {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            })
            .catch(err => {
                console.error('Erro no registro:', err);
                setLoading(false);
    
                // Se err for um objeto, transforme em uma string legível
                if (typeof err === 'object') {
                    setError(JSON.stringify(err));  // Converte o erro em uma string para exibição
                } else {
                    setError('Ocorreu um erro. Por favor, tente novamente.');
                }
                setAlertShow(true);
            });
    }

    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Criar Conta</h1>
                <Form className="col-lg-8" onSubmit={handleSubmitReg}>
                {alertShow &&
                    <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                        <p>
                            {error.errorResponse && error.errorResponse.errmsg 
                                ? `Erro: ${error.errorResponse.errmsg}` 
                                : "Ocorreu um erro. Por favor, tente novamente."
                            }
                        </p>
                    </Alert>
                }
                    <Row>
                        <Form.Group controlId="forName" className="col-lg-8">
                            <Form.Label>Nome *</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Ex: João Silva" onChange={handleChanges} required />
                            <Form.Text muted>
                                O nome pode ser o seu nome real ou um nome de usuário.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Gênero</Form.Label>
                            <Form.Control as="select" defaultValue="não especificado" name="gender" onChange={handleChanges}>
                                <option>masculino</option>
                                <option>feminino</option>
                                <option>não especificado</option>
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="col-lg-12">
                            <Form.Label>Celular *</Form.Label>
                            <Form.Control type="tel" name="phone" placeholder="(11) 91234-5678" pattern="^\([1-9]{2}\) 9[1-9][0-9]{3}-[0-9]{4}$" onChange={handleChanges} required />
                            <Form.Text muted>
                                Insira um número de celular válido com DDD.
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Endereço de e-mail *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="seuemail@exemplo.com" onChange={handleChanges} required />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Senha *</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Senha" onChange={handleChanges} required />
                            <Form.Text muted>
                                A senha deve ter entre 8 e 20 caracteres.
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Aguarde... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Criar Conta</Button>
                    }

                    <p className="bottom-msg-paragraph">Já tem uma conta? <Link to="/auth/login">Entrar</Link>!</p>
                </Form>
            </div>
        </>
    );
}

export default Register;
