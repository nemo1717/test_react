import React, {useState, useEffect} from 'react';
import Navbar from "./Homepage/navbar";
import 'bootstrap/dist/css/bootstrap.css';
import Announcement from "./Homepage/announcement";
import Footer from "./Homepage/footer";
import {getUserID} from "./Util/Common";
import axios from 'axios';

const  Checkout = () => {

  const [data, setdata] = useState([]);
  const userID = getUserID();
  const [cartlength, setcartLength] = useState('');

  useEffect(() => {
    axios.post("http://localhost:5000/cartinfo", {
        userID : userID
      })
      .then((res) => {
          setdata(res.data.data);
          setcartLength(res.data.cartlength);
         
       })
       .catch((err) => console.log(err));
      },[]);

  const itemsPrice = data.reduce((a, c) => a + c.quantity * c.unitprice, 0);
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice +  shippingPrice;

  
    

    return (
    
      <div className="maincontainer">
        <Navbar/>
        <Announcement/>
        <div class="container">
          <div class="py-5 text-center">
            <h2>Checkout</h2>
          </div>
          <div class="row">
            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
                <span class="badge badge-secondary badge-pill">{cartlength}</span>
              </h4>
              <ul class="list-group mb-3">
              {data.map((item) => (
                <React.Fragment>
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">{item.prod_name}</h6>
                      <small class="text-muted">Quantity: {item.quantity}</small>
                    </div>
                    <span class="text-muted">&#8358;{(item.unitprice * item.quantity).toLocaleString()}</span>
                  </li>
                  </React.Fragment>
              ))}
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span class="text-success">-$5</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total</span>
                  <strong>&#8358;{totalPrice.toLocaleString(undefined, {maximumFractionDigits:2})}</strong>
                </li>
              </ul>

              <form class="card p-2">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Promo code"/>
                  <div class="input-group-append">
                    <button type="button" class="btn btn-secondary">Redeem</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-8 order-md-1">
              <h4 class="mb-3">Delivery Address</h4>
              <form class="needs-validation" novalidate>

                <div class="mb-3">
                  <label for="address">Address</label>
                  <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
                  <div class="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-5 mb-3">
                    <label for="country">Country</label>
                    <select class="custom-select d-block w-100" id="country" required>
                      <option value="">Choose...</option>
                      <option>Nigeria</option>
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="state">State</label>
                    <select class="custom-select d-block w-100" id="state" required>
                      <option value="">Choose...</option>
                      <option>Osun</option>
                    </select>
                    <div class="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>

                  <div class="col-md-3 mb-3">
                    <label for="state">City</label>
                    <select class="custom-select d-block w-100" id="state" required>
                      <option value="">Choose...</option>
                      <option>Osogbo</option>
                    </select>
                    <div class="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                </div>
                <hr class="mb-4" />
    
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="save-info" />
                  <label class="custom-control-label" for="save-info">Save this information for next time</label>
                </div>

                
                <hr class="mb-4" />

                <h4 class="mb-3">Payment</h4>

                <div class="d-block my-3">
                  <div class="custom-control custom-radio">
                    <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required />
                    <label class="custom-control-label" for="credit">Credit card</label>
                  </div>
                  <div class="custom-control custom-radio">
                    <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required />
                    <label class="custom-control-label" for="debit">Debit card</label>
                  </div>
                  <div class="custom-control custom-radio">
                    <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required />
                    <label class="custom-control-label" for="paypal">Paypal</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="cc-name">Name on card</label>
                    <input type="text" class="form-control" id="cc-name" placeholder="" required />
                    <small class="text-muted">Full name as displayed on card</small>
                    <div class="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="cc-number">Credit card number</label>
                    <input type="text" class="form-control" id="cc-number" placeholder="" required />
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 mb-3">
                    <label for="cc-expiration">Expiration</label>
                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                    <div class="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="cc-expiration">CVV</label>
                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                    <div class="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr class="mb-4" />
                <button class="btn btn-primary btn-lg btn-block" type="button">Continue to checkout</button>
              </form>
            </div>
          </div>
          <br/>
          <Footer/>
        </div>
     
      </div>
      
    )
};

export default Checkout;