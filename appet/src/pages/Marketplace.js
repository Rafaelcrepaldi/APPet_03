import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Marketplace.css'; // Importar arquivo de estilo

function Marketplace() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const fetchProducts = useCallback(async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:4000/api/products?page=${page}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(response.data.products);
            setPages(response.data.pages);
            setLoading(false);
        } catch (error) {
            setError('Erro ao buscar produtos.');
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1); 
    };

    const handleNextPage = () => {
        if (page < pages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Carregando produtos...</p>
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="marketplace-container">
            <div className="marketplace-header">
                <h1>Marketplace</h1>
                <p>Encontre produtos de alta qualidade para o seu pet.</p>

                <input
                    type="text"
                    className="search-bar"
                    placeholder="🔍 Buscar por nome ou cidade"
                    value={search}
                    onChange={handleSearch}
                />

                <Link to="/add-product">
                    <button className="add-product-btn">Adicionar Novo Produto</button>
                </Link>
            </div>

            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.title} className="product-image" />
                            <div className="product-details">
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>Preço: R$ {product.price}</p>
                                <p>Estoque: {product.stock}</p>
                                <p>Cidade: {product.city}</p>
                                <button className="add-to-cart-btn">Adicionar ao Carrinho</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto disponível no momento.</p>
                )}
            </div>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>Anterior</button>
                <span>Página {page} de {pages}</span>
                <button onClick={handleNextPage} disabled={page === pages}>Próxima</button>
            </div>
        </div>
    );
}

export default Marketplace;
