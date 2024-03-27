
import './App.css';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Home from './Home';
import Product from './Product';
import Cart from './Cart';
import NavBar from './Navbar';
import Footer from './Footer';
import RegisterPage from './RegisterPage';

function App() {
  return (
   <BrowserRouter>
   <NavBar></NavBar>
   <Routes>
    {/* <Route path='/register' element={<RegisterPage/>}></Route> */}
    <Route path="/" element={<Home/>}></Route>
    <Route path="/product" element={<Product/>}></Route>
    <Route path="/cart" element={<Cart/>}></Route>
  </Routes>

   <Footer/>
   </BrowserRouter>
  );
}

export default App;
