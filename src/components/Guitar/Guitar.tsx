import type { ReactElement } from "react";
import { type Guitar as GuitarT } from "../../data/guitars";

interface GuitarProps {
  guitar: GuitarT,
  addToCart: (guitar: GuitarT) => void
}

export default function Guitar ( { guitar, addToCart } : GuitarProps ) : ReactElement {

  const { id, name, image, description, price } = guitar;


  return (
      <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4" id={`guitar-${id}`}>
          <img
            className="img-fluid"
            src={`/img/${image}.jpg`}
            alt="imagen guitarra"
          />
        </div>
        <div className="col-8">
          <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
          <p>{description}</p>
          <p className="fw-black text-primary fs-3">${price}</p>
          <button onClick={() => addToCart(guitar)} type="button" className="btn btn-dark w-100">
            Agregar al Carrito
          </button>
        </div>
      </div>
  )
}