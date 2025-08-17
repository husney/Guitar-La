import { useState, type ReactElement } from "react";
import Guitar from "../Guitar/Guitar";
import { db, type Guitar as GuitarT } from "../../data/guitars";

const Main = ( {addToCart} : { addToCart: (guitar: GuitarT) => void} ) : ReactElement => {

  const [guitars, ] = useState<GuitarT[]>(db);
  
  return (
    <main className="container-xl mt-5">
      <h2 className="text-center">Nuestra Colección</h2>

      <div className="row mt-5">
        {
          guitars.map(x => {
            return (
              <Guitar 
                key={x.id}
                guitar={x}
                addToCart={addToCart}
              />
            )
          })
        }
      </div>
    </main>
  );
};

export default Main;
