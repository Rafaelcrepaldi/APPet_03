import React, { useEffect, useState } from 'react';
import { getPets, createPet, deletePet, updatePet } from '../services/petService';
import './css/Pets.css';  // Adicionando um estilo aprimorado

const MyPets = () => {
    const [pets, setPets] = useState([]);
    const [newPetData, setNewPetData] = useState({
        name: '',
        species: '',
        breed: '',
        age: '',
        weight: ''
    });
    const [message, setMessage] = useState(null);  // Para feedback

    useEffect(() => {
        const loadPets = async () => {
            const petList = await getPets();
            if (petList) {
                setPets(petList);  // Certifique-se de que o petList seja um array
            } else {
                setPets([]);  // Caso a requisição falhe, inicialize como array vazio
            }
        };
        loadPets();
    }, []);

    const handleInputChange = (e) => {
        setNewPetData({ ...newPetData, [e.target.name]: e.target.value });
    };

    const handleCreatePet = async () => {
        const response = await createPet(newPetData);
        if (response) {
            const updatedPets = await getPets();
            setPets(updatedPets);
            setMessage('Pet criado com sucesso!');
        } else {
            setMessage('Erro ao criar pet.');
        }
    };

    const handleDeletePet = async (petId) => {
        if (window.confirm('Tem certeza que deseja deletar este pet?')) {
            const response = await deletePet(petId);
            if (response) {
                const updatedPets = await getPets();
                setPets(updatedPets);
                setMessage('Pet deletado com sucesso!');
            } else {
                setMessage('Erro ao deletar pet.');
            }
        }
    };

    const handleUpdatePet = async (petId) => {
        const updatedData = {
            name: 'Novo Nome',
            species: 'Nova Espécie',
            breed: 'Nova Raça',
            age: 4,
            weight: 20
        };
        const response = await updatePet(petId, updatedData);
        if (response) {
            const updatedPets = await getPets();
            setPets(updatedPets);
            setMessage('Pet atualizado com sucesso!');
        } else {
            setMessage('Erro ao atualizar pet.');
        }
    };

    return (
        <div className="my-pets-container">
            <h2>Meus Pets</h2>
            {message && <p className="message">{message}</p>}

            <ul className="pet-list">
                {pets.map((pet) => (
                    <li key={pet.id} className="pet-item">
                        <h3>{pet.name}</h3>
                        <p>Espécie: {pet.species}</p>
                        <p>Raça: {pet.breed}</p>
                        <p>Idade: {pet.age} anos</p>
                        <p>Peso: {pet.weight} kg</p>
                        <div className="pet-actions">
                            <button onClick={() => handleUpdatePet(pet._id)}>Atualizar</button>
                            <button onClick={() => handleDeletePet(pet._id)}>Deletar</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="new-pet-container">
                <h3>Adicionar Novo Pet</h3>
                <input type="text" name="name" placeholder="Nome" onChange={handleInputChange} />
                <input type="text" name="species" placeholder="Espécie" onChange={handleInputChange} />
                <input type="text" name="breed" placeholder="Raça" onChange={handleInputChange} />
                <input type="number" name="age" placeholder="Idade" onChange={handleInputChange} />
                <input type="number" name="weight" placeholder="Peso (kg)" onChange={handleInputChange} />
                <button onClick={handleCreatePet}>Adicionar Pet</button>
            </div>
        </div>
    );
};

export default MyPets;
