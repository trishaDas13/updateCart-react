import React, { useReducer } from "react";
import Data from "./Data";
import Cart from "./Cart";

//todo: reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "DECREAMENT":
      return {
        ...state,
        products: state.products.map((product, index) =>
          index === action.index
            ? { ...product, quantity: Math.max(0, product.quantity - 1) }
            : product
        ),
      };
    case "INCREAMENT":
      return {
        ...state,
        products: state.products.map((product, index) =>
          index === action.index
            ? { ...product, quantity: product.quantity + 1 }
            : product)
      };
    case "ADDCART":
        const selectedItem = state.products[action.index];
      const existingItemIndex = state.carts.findIndex(item => item.name === selectedItem.name);

      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update its quantity
        const updatedCarts = state.carts.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          carts: updatedCarts,
        };
      } else {
        // If the product is not in the cart, add it
        return {
          ...state,
          carts: [...state.carts, { ...selectedItem, quantity: 1 }],
        };
      }
    case "DELETECART":
        const cartItemIndex = state.carts.findIndex(
          item => item.name === state.products[action.index].name
        );
  
        if (cartItemIndex !== -1) {
          // If the item is in the cart, decrease its quantity
          const updatedCarts = state.carts.map((item, index) =>
            index === cartItemIndex && item.quantity > 0
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
  
          return {
            ...state,
            carts: updatedCarts.filter(item => item.quantity > 0),
          };
        } else {
          // Item not in the cart, do nothing
          return state;
        }
    default:
      return state;
  }
};

const Product = () => {
  //todo: declair reducer
  let initalState = {
    products:[...Data],
    carts:[]
  };  
  const [state, dispatch] = useReducer(reducer, initalState);
 
  //todo: render element
  return (
    <>
      <div className="product">
        <h1>Product</h1>
        <div className="product_card_container">
          {state.products.map((item, idx) => {
            return (
              <div className="product_card" key={idx}>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <div className="counter">
                  <button
                    onClick={() => {
                        dispatch({ type: "DECREAMENT", index: idx })
                        dispatch({type: "DELETECART", index: idx})
                      }
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                        dispatch({type: "INCREAMENT", index: idx })
                        dispatch({type: "ADDCART", index: idx})
                      }
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Cart carts= {state.carts}/>
    </>
  );
};

export default Product;
