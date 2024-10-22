const baseUrl = 'http://localhost:4000/api';

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${baseUrl}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao registrar:', error);
        return { error: 'Erro de conexão. Tente novamente mais tarde.' };
    }
}


export async function loginUser(userData) {
    try {
        const response = await fetch(`${baseUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Envia cookies, se necessário
            body: JSON.stringify(userData)
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            // Extrai a mensagem de erro, se disponível
            const errorData = await response.json();
            return {
                error: errorData.message || 'Erro ao tentar realizar o login. Tente novamente.'
            };
        }

        // Se a requisição for bem-sucedida, retorna os dados
        return await response.json();
    } catch (error) {
        // Tratamento de erro de rede ou outro problema
        console.error('Erro na requisição de login:', error);
        return { error: 'Ocorreu um erro de conexão. Por favor, tente novamente mais tarde.' };
    }
}


export async function getUser() {
    return await (await fetch(baseUrl + '/auth/getUser', {credentials: 'include'})).json()
}

export async function getUserActiveSells(id) {
    return (await fetch(`${baseUrl}/products/sells/active/${id}`, {credentials: 'include'})).json();
}

export async function getUserArchivedSells() {
    return (await fetch(`${baseUrl}/products/sells/archived`, {credentials: 'include'})).json();
}

export async function getUserWishlist() {
    return (await fetch(`${baseUrl}/products/wishlist/getWishlist`, {credentials: 'include'})).json();
}

export async function editUserProfile(id, data) {
    return (await fetch(`/user/edit-profile/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })).json();
}

export async function getUserById(id) {
    return await (await fetch(baseUrl + `/user/getUserById/${id}`, {credentials: 'include'})).json()
}