import './App.css';
import {BsCart3} from "react-icons/bs";
import {useState} from "react";
import productDetails from "./productDetails.json";


// The product details are provided in "productDetails.json" file

function App() {

  // Setting initial state for the cart-count value
  const [cartCount, setCartCount] = useState(0);

  // Setting initial state for the array of ids (of the products) which are added to cart
  const [idsInCart, setIdsInCart] = useState([]);


  // The "addToCartFun" function handles adding a product to the cart
  const addToCartFun = (idToAddIs) => {
      setIdsInCart((idsInCart)=>idsInCart.concat([idToAddIs]));
      setCartCount(cartCount+1);
  }

  // The "removeFromCartFun" function handles removing a product from the cart
  const removeFromCartFun = (idToRemoveIs) => {
      setIdsInCart((idsInCart)=>idsInCart.filter((idVal)=> idVal !== idToRemoveIs));
      setCartCount(cartCount-1);
  }
    

  // Returning data to be displayed on the web-page
    return(
      // "main-div" class div holds the complete web-page
        <div className="main-div">

          {/* "navbar-div" class is for Navbar */}
          <div className="navbar-div" >

          {/* "navbar-sub-div-1" class div displays the "Home", "About", "Shop" */}
            <div className="navbar-sub-div-1" >
              <span>Home</span>
              <span>About</span>
              <span>Shop</span>
            </div>

            {/* "navbar-sub-div-2" class div displays the cart-count */}
            <div className="navbar-sub-div-2">

              <span><BsCart3 /></span>
              <span>Cart</span>
              <span> 
                  {cartCount} 
              </span>

            </div>

          </div>   


          {/* "middle-headings-div" class div display the two-middle headings */}
          <div className="middle-headings-div">
              <h1 className="middle-heading-1" >Shop in style</h1>
              <h5 className="middle-heading-2" >With this shop homepage template</h5>
          </div>


          {/* "div-containing-all-products" class div displays all the products */}
          <div className="div-containing-all-products" style={{display:'flex', flexDirection:"row", flexWrap:'wrap'}}>
              
              {/* Applying map function to iterate through the data of all the products */}
              {productDetails.map(product=>{

                // "each-product-div" class div displays the data of single product at a time
                return <div className="each-product-div" key={product.id.toString()}>

                  {/* Displaying the image of the product */}
                  <img src={product.image} width="230px" height="150px" alt="missing"/>

                  <br />

                  {/* Displaying the category of the product */}
                  <h5 className="product-category-h">{product.category}</h5>

                  {/* Displaying the title or name of the product */}
                  <p className="product-name-p">{product.title}</p>
              
                  {/* If rating is available for that product then displaying the rating on a scale of 5 */}
                  {product.rating?
                      (<p className='rating-p' >Rating: <b>{product.rating}</b><span>/5</span></p>)
                  :
                      (<p>Not yet rated</p>)}


                    {/* Displaying the price of the product */}
                  {(product.category==="Sale Item" || product.category==="Special Item")? 
                      (<p className="sale-special-price-p" >
                        <span>{"$"+product["old-price"]}</span> 
                        <span>{"$"+product.price}</span>
                      </p>)
                  : product.category==="Popular Item" ? 
                      (<p><span>{"$"+product.price}</span></p>)
                  :
                      (<p className="remining-price-p">
                        <span className="product-price-span-1">{"$"+product["old-price"]}</span>
                        <span>-</span> <span className="product-price-span-2">{"$"+product.price}</span>
                      </p>)}

                  
                  {/* Checking whether the id of the product is in "idsInCart" array */}
                  {/* If it is already added to the cart then showing "Remove from cart" and assigning "removeFromCartFun" function */}
                  {/* If it is not added to the cart then showing "Add to cart" and assigning "addToCartFun" function */}
                  {idsInCart.includes(product.id)? 
                      (<button className="add-button" onClick={()=>removeFromCartFun(product.id)}>Remove from cart</button>)
                  :
                      (<button className="remove-button" onClick={()=>addToCartFun(product.id)}>Add to cart</button>)
                  }

                </div>
              })}

          </div>            
    </div>
    )
}

export default App;
