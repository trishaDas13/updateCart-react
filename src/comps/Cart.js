import React from 'react'

const Cart = (props) => {
  return (
    <div className='Cart'>
        <h1>Cart</h1>
        {
          props.carts.map((item, idx)=>{
            return(
              <div key={idx} className="cart-item">
                <p>{item.name}</p>
                <p>{item.quantity} X {item.price}</p>
              </div>
            );
          })
        }
      <p className="total">
          ₹{props.carts.reduce((sum, ele) => sum + ele.quantity * ele.price, 0)}
        </p>
    </div>
  )
}

export default Cart;