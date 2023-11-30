


import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';


function NavBar() {

  const cart = useSelector((state) => state.app.cart);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light static-top">


      <div className="container">

        <h3>Start Shopping 🎁 </h3>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Product
              </Link>
            </li>


          </ul>
          <form className="d-flex">
            <Link className="nav-link " to="/cart">
              <div className='cart mx-4'>
                <i className="bi-cart-fill me-1" ></i> Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  {cart.length}
                </span>
              </div>
            </Link>
          </form>
        </div>

      </div>
    </nav>
  )
}

export default NavBar




