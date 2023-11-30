

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, addTotal, addQty, removeFromCart } from './redux/ProductSlice';
import { Link } from 'react-router-dom';

function Cart() {
  const cart = useSelector((state) => state.app.cart);
  const cartTotal = useSelector((state) => state.app.cartTotal);
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, newQty) => {
    // If the new quantity is greater than 0, update the quantity
    if (newQty > 0) {
      dispatch(addQty({ id: productId, qty: newQty }));
    } else {
      // If the new quantity is 0 or less, remove the item from the cart
      dispatch(removeFromCart(productId));
    }

    // Update the total
    dispatch(addTotal());
  };

  const removeFromCart = (productId) => {
    dispatch(removeFromCart({ id: productId }));
  };

  const total = cart.reduce(
    (acc, item) => acc + parseFloat(item.h) * parseFloat(item.quantity),
    0
  );

  return (
    <div className="container mt-5 cart-page">
      <h2 className="text-center mb-4 cart-container">Shopping Cart </h2>
      <div className="row">
        <div className="col-lg-8">
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div className="row mb-4 mt-4 cart-item" key={item.id}>
                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img
                      src={item.img}
                      className="img-thumbnail border-light"
                      style={{ height: '200px', width: '200px' }}
                      alt={item.title}
                    />
                  </div>

                  <div className="col-md-4">
                    <h3 className="text-bold cart-title"> {item.title}</h3>
                    <p className="text-body-secondary">{item.sub}</p>

                    {item.offer ? (
                      <>
                        <h6>
                          M.R.P :{' '}
                          <span className="text-muted text-decoration-line-through">
                            {parseFloat(item.g).toLocaleString()}
                          </span>
                        </h6>
                        <h4>
                          Price : {parseFloat(item.h).toLocaleString()}{' '}
                          <div>
                            <h6>
                              Qty :{' '}
                              <span>
                                <button
                                  className="btn btn-link"
                                  onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                >
                                  <i className="bi bi-dash-lg"></i>
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                  className="btn btn-link"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <i className="bi bi-plus-lg"></i>
                                </button>
                              </span>
                            </h6>
                          </div>{' '}
                        </h4>
                      </>
                    ) : (
                      <h4>Price : {parseFloat(item.g).toLocaleString()}{' '}
                        <div>
                          <h6>
                            Qty :{' '}
                            <span>
                              <button
                                className="btn btn-link"
                                onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <i className="bi bi-dash-lg"></i>
                              </button>
                              <span className="mx-2">{item.quantity}</span>
                              <button
                                className="btn btn-link"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <i className="bi bi-plus-lg"></i>
                              </button>
                            </span>
                          </h6>
                        </div>{' '}
                      </h4>
                    )}
                    <p>{item.description}</p>
                    <button className="btn btn-primary mb-4 ">
                      <i className="bi bi-lightning-charge-fill"></i>Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center">
              <h4 className="text-center mt-4">
                {' '}
                <i className="bi bi-question-diamond-fill"></i> No Cart items added previously?{' '}
              </h4>
              <Link to="/Product">
                <button className="btn btn-warning btn-lg btn-block mb-4 mt-4">Go to Products!</button>
              </Link>
            </div>
          )}
        </div>

        <div className="col-lg-4 total-box text-center">
          <h3 className="text-center mt-2">Subtotal
            {/* ({cart.length} items) */}
          </h3>
          <p className="text-center mt-4 mb-4 paragraph">
            {' '}
            <i className="bi bi-check-circle-fill"></i> Part of your order qualifies for FREE Delivery. Select this
            option at checkout. Details
          </p>
          <h4 className="text-center">Total Price : {cartTotal.toLocaleString()}</h4>
          <div className="d-grid gap-2">
            <button className="btn btn-warning proceed-butn mb-5">Proceed to Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;




