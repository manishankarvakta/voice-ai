import './App.css';
import { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

// const products =  [
//   {name: "Potato", bdName: "আলু", category: "Vegetable", price: 20, unit: "kg", img: "https://media.istockphoto.com/photos/three-potatoes-picture-id157430678?b=1&k=20&m=157430678&s=170667a&w=0&h=EY1tYKyL7VK84Xrj3vXRQee29NocctYXWBkdGdDQIow="},
//   {name: "Chinigura Chal", bdName: "চিনিগুরা চাল", category: "rice", price: 150, unit: "kg", img: "https://media.istockphoto.com/photos/golden-rice-picture-id504706988?k=20&m=504706988&s=612x612&w=0&h=tJxaZ5hb0e2_tP0JGTTOqgkci4JUglPURH6LVP7Q7Ck="},
//   {name: "Onion", bdName: "পেয়াজ", category: "Vegetable", price: 40, unit: "kg", img: "https://media.istockphoto.com/photos/red-onion-slice-picture-id175448479?b=1&k=20&m=175448479&s=170667a&w=0&h=kcjadYpPSifmgaESFhA7EKVMdLmL-pXPhrwSvJM0o2U="},
//   {name: "Garlic", bdName: "রসুন", category: "Vegetable", price: 35, unit: "kg", img: "https://media.istockphoto.com/photos/closeup-of-garlic-clove-on-white-background-picture-id185408964?b=1&k=20&m=185408964&s=170667a&w=0&h=93rwQe-luEMcan27j2TapnMcwlObzt_e-UpU3RgyCZ0="},
//   {name: "Fish", bdName: "মাছ", category: "Fish", price: 200, unit: "kg", img: "https://media.istockphoto.com/photos/group-of-raw-seafood-isolated-on-white-background-picture-id1185677996?k=20&m=1185677996&s=612x612&w=0&h=RN5_9BSSrCYie98fCvniYI2Dv5Zj05ro3r1isYMQc-o="},
//   {name: "Meat", bdName: "মাংস", category: "Mate", price: 350, unit: "kg", img: "https://media.istockphoto.com/photos/prime-boneless-hip-sirloin-steak-picture-id171359079?k=20&m=171359079&s=612x612&w=0&h=IKNTtaCOnk5geK4OhnAKT6uCx9nk4KPZY5ltDTGxCvo="},
//   {name: "Tomato", bdName: "টমেটো", category: "Vegetable", price: 30, unit: "kg", img: "https://media.istockphoto.com/photos/three-tomatoes-picture-id91476821?k=20&m=91476821&s=612x612&w=0&h=elNgNhECKMF_v_3p1kHLL7b4OWi44WrLJDDHJbiAlbI="}
// ];

function App() {
  
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [productOnCart, setProductOnCart] = useState(0);

  const addToCart = (product) =>{
    setCart((oldCart) =>{
      return [...oldCart, product];
    })
    setCartTotal((oLdCartTotal) =>{
      return oLdCartTotal + product.price;
    })
    setProductOnCart((oLdProductOnCart) =>{
      return oLdProductOnCart + 1;
    })
    console.log(product)
  }

  
    useEffect(() => {
      alanBtn({
          key: '67770287c9281fa003d90d6641c324302e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: (commandData) => {
            if(commandData.command == 'getProducts'){
              setProducts(commandData.data)
            }
          }
      });
    }, []);
  
  return (
    <div className="App">
      
      <div className='row'>
        <div>
          <header className='header'>
            <div><h3>artificial intelligence shop</h3></div>
            <div> <p className='productCart'>Cart : {productOnCart}</p></div>
          </header>
          <div className='product'>
            {
              products.map(product => (
                <div key={product.name} className="col">
                  <img className='product-img' src={`${product.img}`} />
                  <h4>{product.name} ( {product.bdName} )</h4>  
                  <p>{product.price}TK/per {product.unit}</p>
                  <button className='addCart' onClick={()=>addToCart(product)}>Add to Cart</button>
                </div>
              ))
            }
          </div> 
        </div>
        <div className='cart'>
          <h3>cart</h3>
          <hr/>
              {cart.map(product =>(
                <p className='cart-item' key={product.name}>
                  <img className='cart-product-img' src={`${product.img}`} />
                  {product.name} (1{product.unit})<span className='pull-right'> <b>{product.price}</b><small>TK</small></span>
                </p>
              ))}

          <hr/>
          <p className='pull-right'>Total: <b>{parseFloat(cartTotal).toFixed(2)}</b><small>TK</small></p>
        </div>
      </div>
    </div>
  );
}

export default App;
