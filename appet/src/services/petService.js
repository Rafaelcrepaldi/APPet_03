import axios from 'axios';

// URL da API, pode ser configurada dinamicamente com variáveis de ambiente
const API_URL = 'http://localhost:4000/api/pets'

// Função para listar todos os pets do usuário
export const getPets = async () => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Pets obtidos com sucesso:', response.data);
        return response.data; // Retorna os dados dos pets
    } catch (error) {
        console.error('Erro ao obter pets:', error.response ? error.response.data : error);
    }
};

// Função para criar um novo pet
export const createPet = async (petData) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(API_URL, petData, {
            headers: {
                Authorization: `Bearer ${token}`, // Envia o token no cabeçalho para autenticação
                'Content-Type': 'application/json'
            }
        });
        console.log('Pet criado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar pet:', error.response ? error.response.data : error);
    }
};

// Função para atualizar um pet específico
export const updatePet = async (petId, updatedPetData) => {
    const token = localStorage.getItem('token');
    const petUrl = `${API_URL}/${petId}`;

    try {
        const response = await axios.put(petUrl, updatedPetData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Pet atualizado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar pet:', error.response ? error.response.data : error);
    }
};

// Função para deletar um pet específico
export const deletePet = async (petId) => {
    const token = localStorage.getItem('token');
    const petUrl = `${API_URL}/${petId}`;

    try {
        const response = await axios.delete(petUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Pet deletado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar pet:', error.response ? error.response.data : error);
    }
};

// Função para obter um pet específico (opcional)
export const getPetById = async (petId) => {
    const token = localStorage.getItem('token');
    const petUrl = `${API_URL}/${petId}`;

    try {
        const response = await axios.get(petUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Detalhes do Pet:', response.data);
        return response.data; // Retorna os dados do pet
    } catch (error) {
        console.error('Erro ao obter detalhes do pet:', error.response ? error.response.data : error);
    }
};
