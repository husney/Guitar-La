import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { type Guitar as GuitarT } from "./data/guitars";

interface ItemCart {
  item: GuitarT;
  quantity: number;
}

export interface Cart {
  items: ItemCart[];
  total: number;
}

function App() {

  const [cart, setCart] = useState<Cart>(() => {

    const cart = localStorage.getItem("cart");
    if(cart){
      return JSON.parse(cart) as Cart;
    }
    return {items: [],total: 0}

  });

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

  function calculateTotal(items: ItemCart[]): number {
    return items.reduce((total, { item, quantity }) => {
      return total + item.price * quantity;
    }, 0);
  }

  const addToCart = (item: GuitarT): void => {
    setCart((prevCart) => {
      const previousIndexItem = prevCart.items.findIndex(x => x.item.id === item.id);

      let newItems;

      if (previousIndexItem >= 0) {
        newItems = [...prevCart.items];
        if (newItems[previousIndexItem].quantity < MAX_ITEMS)
          newItems[previousIndexItem].quantity += 1;
      } else {
        newItems = [...prevCart.items, { item, quantity: 1 }];
      }

      const updatedCart = {
        items: newItems,
        total: calculateTotal(newItems)
      }

      return updatedCart;
    });
  };

  const removeFromCart = (item: GuitarT): void => {
    setCart((prevCart) => {
      const newItems = [...prevCart.items.filter((x) => x.item.id !== item.id)];

      const updatedCart = {
        items: newItems,
        total: calculateTotal(newItems)
      }

      return updatedCart;
    });
  };

  const substractFromCart = (item: GuitarT): void => {
    // setCart(prevCart => {

    //   const itemIndex = prevCart.items.findIndex(x => x.item.id === item.id);

    //   let newItems;
    //   if(itemIndex >= 0){
    //     newItems = [...prevCart.items];
    //     if(newItems[itemIndex].quantity > 1)
    //       newItems[itemIndex].quantity -= 1;
    //     else{
    //       newItems.splice(itemIndex, 1);
    //     }
    //   }
    //   else{
    //     newItems = [...prevCart.items];
    //   }

    //   return { items: newItems, total: calculateTotal(newItems) };

    // })

    let items = cart.items.map((x) => {
      if (x.item.id == item.id && x.quantity > MIN_ITEMS) {
        return {
          ...x,
          quantity: x.quantity > 1 ? x.quantity - 1 : 0,
        };
      } 
      return x;
    });

    items = items.filter((x) => x.quantity > 0);

    const data = {
        items: items,
        total: calculateTotal(items)
    }
    
    setCart(data);
  };

  const clearCart = (): void => {

    const data = {
      items: [],
      total: 0
    }
    setCart(data);
  };

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  return (
    <>
      <Header
        cart={cart}
        addToCart={addToCart}
        substractFromCart={substractFromCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
      <Main addToCart={addToCart} />
      <Footer />
    </>
  );
}

export default App;
