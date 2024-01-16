import React, { useReducer } from "react";
import Data from "./Data";
import Cart from "./Cart";

//todo: reducer function
const reducer = (state, action) => {
    console.log(state, action);
  switch (action.type) {
    case "DECREAMENT":
      return {
        ...state,
        [action.index]: Math.max((state[action.index] || 0) - 1, 0),
      };
    case "INCREAMENT":
      return {
        ...state,
        [action.index]: (state[action.index] || 0) + 1,
      };
    default:
      return state;
  }
};

const Product = () => {
  //todo: declair reducer
  let initalState = {};
  const [state, dispatch] = useReducer(reducer, initalState);

  //todo: render element
  return (
    <>
      <div className="product">
        <h1>Product</h1>
        <div className="product_card_container">
          {Data.map((item, idx) => {
            return (
              <div className="product_card" key={idx}>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <div className="counter">
                  <button
                    onClick={() => dispatch({ type: "DECREAMENT", index: idx })}
                  >
                    -
                  </button>
                  <span>{state[idx] || 0}</span>
                  <button
                    onClick={() => dispatch(
                        {   type: "INCREAMENT", 
                            index: idx ,
                            name: item.name,
                            price: item.price,
                            quantity: state[idx] || 0,
                        })}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Cart state= {state}/>
    </>
  );
};

export default Product;
