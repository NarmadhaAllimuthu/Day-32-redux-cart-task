


import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, addToCart } from './redux/ProductSlice';

function Product() {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.app);


  useEffect(() => {
    if (data.products.length === 0) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const products = await axios.get("https://6566f61764fcff8d730f7381.mockapi.io/shop");
      console.log(products.data)
      dispatch(setProducts(products.data));
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleCart = (item) => {
    dispatch(addToCart(item.id))
  }

  return (
    <div className='container mt-5 product-conatiner'>
      <div className='row mt-4 product-row'>
        {data.products.map((item) => (
          <div className='col-md-3 mb-5' key={item.id}>
            <div class="card text-center border-light" style={{ width: "18rem", height: "500px" }}>
              <img src={item.img} className="card-img-top display-center mx-auto d-block mt-2" style={{ height: "170px", width: "170px" }} alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="text-body-secondary">{item.sub}</p>
                <h6 className="fw-light">{item.description}</h6>
                {item.offer ? (
                  <>
                    {item.rating && (
                      <div className="d-flex justify-content-center small text-warning mb-2">
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                      </div>
                    )}

                    <div className="feature-details justify-content-center">
                      <span className="text-muted text-decoration-line-through">₹{parseFloat(item.g).toLocaleString()}</span>&ensp;
                      <h4>₹{parseFloat(item.h).toLocaleString()}</h4>
                    </div>
                  </>
                ) : (
                  <>
                    {item.rating && (
                      <div className="d-flex justify-content-center small text-warning mb-2">
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                      </div>
                    )}

                    <h4 >₹ {parseFloat(item.g).toLocaleString()}</h4>
                  </>
                )}


                <button class="btn btn-warning text-white mt-2 mb-2" onClick={() => { handleCart(item) }}>
                  <i class="bi bi-cart-fill"></i>    Add to cart</button>


              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
