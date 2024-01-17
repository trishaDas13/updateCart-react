import React from 'react'

const Cart = (props) => {
  return (
    <>
    {
      props.carts.length === 0 ?
      (<h3 className="empty">No product is there in your cart!</h3>):
      (
        <div className='cart'>
        <h1>Cart</h1>
        {
          props.carts.map((item, idx)=>{
            return(
              <div key={idx} className="cart_item">
                <p>{item.name}</p>
                <p>{item.quantity} X {item.price}</p>
              </div>
            );
          })
        }
      <h3 className="total"
        style={props.carts.length === 0 ?
          {display:'none'}: {display: 'inline'}
        }
      > Total: 
          ₹{props.carts.reduce((sum, ele) => sum + ele.quantity * ele.price, 0)}
        </h3>
    </div>
      )
    }
      
    </>
  )
}

export default Cart;