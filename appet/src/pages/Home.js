import React from 'react';
import './css/App.css'; // importar estilo

function Home() {
    return (
        <div>
        <h1>Bem-vindo ao APPet!</h1>
        <p>Seu app completo para cuidar do seu pet com serviços como cadastro, marketplace, e telemedicina veterinária.</p>
        <p>Navegue pelo nosso aplicativo para gerenciar os cuidados e a saúde do seu pet de forma prática e rápida.</p>
        <ul>
            <li>Cadastre seus pets e mantenha o histórico médico sempre atualizado.</li>
            <li>Explore o marketplace com produtos e serviços para seus pets.</li>
            <li>Consulte veterinários diretamente pelo aplicativo.</li>
        </ul>
        </div>
    );
}

export default Home;
