import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AddPets from './pages/AddPets';
import MyPets from './pages/MyPets';
import Marketplace from './pages/Marketplace';
import AddProduct from './pages/AddProduct';
import PrivateRoute from './components/PrivateRoute'; // Importando o PrivateRoute
import Error404 from './pages/Error404';
import LogOut from './pages/LogOut';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Rotas sem autenticação */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/logout" element={<LogOut />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypets"
          element={
            <PrivateRoute>
              <MyPets />
            </PrivateRoute>
          }
        />
        <Route
          path="/addpets"
          element={
            <PrivateRoute>
              <AddPets />
            </PrivateRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <PrivateRoute>
              <Marketplace />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />

        {/* Rota de erro 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
