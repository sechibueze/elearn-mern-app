import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { removeItemFromCart, clearCart } from '../../_actions/cartAction';

const ShoppingCart = ({ cartItems, removeItemFromCart, clearCart }) => {
  const calculateTotalPay = productsInCart => {
    let totalPay = 0;
    productsInCart.map(item => {
      if (item.price !== 'free') {
        totalPay += Number.parseFloat(item.price);
      }
    })

    return totalPay;
  }
  if(!cartItems) return <Loader />

  return (
    <Fragment>
      <div className="container">
        {cartItems.length < 1 ?
          (<h2> No Items in Cart </h2>) :
         (
            <Fragment>
              <table className="table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Course Image</th>
                    <th>Course Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartItems.map((items, idx) => (
                      <tr key={idx}>
                        <td> {`${++idx}`} </td>
                         <td> {items.title} </td>
                        <td> {items.price === 'free' ? 0 : items.price} </td>
                        <td> <span onClick={() => removeItemFromCart(items.courseId)} class="fa fa-close" /> </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <span onClick={() => clearCart()} className='fa fa-recycle' />

              <span> { calculateTotalPay(cartItems)} </span>
            </Fragment>
         )
        }
      </div>
    </Fragment>
  );
}
ShoppingCart.propTypes = {
  removeItemFromCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired
}
 const mapStateToProps = state => ({
   cartItems: state.cart.items
 });
export default connect(mapStateToProps, { removeItemFromCart, clearCart })(ShoppingCart);