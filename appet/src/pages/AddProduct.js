import React, { useState } from 'react';
import axios from 'axios';
import './css/App.css'; // importar estilo

function AddProduct() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null); // Mudança para aceitar arquivos de imagem
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    // Função para lidar com a mudança de imagem
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Criar o preview da imagem
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('city', city);
        formData.append('stock', stock);
        formData.append('image', image); // Adicionando a imagem ao FormData

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:4000/api/products/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}` // Não defina 'Content-Type' manualmente
                }
            });

            if (response.status === 201) {
                setMessage(`Produto criado com sucesso! ID do Produto: ${response.data.productId}`);
            } else {
                setMessage('Falha ao criar o produto.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Erro ao criar produto.');
        }
    };

    return (
        <div>
            <h2>Adicionar Produto</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Título:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Preço:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" required />
                </div>
                <div>
                    <label>Categoria:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Selecione uma categoria</option>
                        <option value="electronics">Eletrônicos</option>
                        <option value="books">Livros</option>
                        <option value="clothing">Roupas</option>
                        <option value="others">Outros</option>
                    </select>
                </div>
                <div>
                    <label>Cidade:</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div>
                    <label>Estoque:</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} min="0" required />
                </div>
                <div>
                    <label>Imagem:</label>
                    <input type="file" onChange={handleImageChange} accept="image/*" required />
                    {imagePreview && <img src={imagePreview} alt="Preview" width="100" />} {/* Mostrar o preview da imagem */}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Adicionando Produto...' : 'Adicionar Produto'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddProduct;
