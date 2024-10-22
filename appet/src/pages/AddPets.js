import React, { useState } from 'react';
import axios from 'axios';

function  CreatePet() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [weight, setAWeight] = useState('');
    const [gender, setGender] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = localStorage.getItem('id');

        const formData = new FormData();
        formData.append('ownerID', id);
        formData.append('name', name);
        formData.append('species', species);
        formData.append('breed',breed );
        formData.append('age',age );
        formData.append('weight', weight);
        formData.append('gender', gender);

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:4000/api/pets/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                setMessage('Pet criado e atribuído com sucesso!');
                setError('');
            } else {
                setMessage('Erro ao criar o pet. Tente novamente.');
            }
        } catch{
            setError('Ocorreu um erro ao criar o pet.');
        }
    };

    return (
        <div>
        <h2>Criar Pet</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label>Nome do Pet</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Espécie</label>
            <input
                type="text"
                name="species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Raça</label>
            <input
                type="text"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Idade</label>
            <input
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Peso</label>
            <input
                type="number"
                name="weight"
                value={weight}
                onChange={(e) => setAWeight(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Gênero</label>
            <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
            >
                <option value="Male">Macho</option>
                <option value="Female">Fêmea</option>
            </select>
            </div>

            <div>
            <label>Imagem do Perfil (URL)</label>
            <input
                type="text"
                name="profileImage"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
            />
            </div>

            <button type="submit">Criar Pet</button>
        </form>
        </div>
    );
};

export default CreatePet;
