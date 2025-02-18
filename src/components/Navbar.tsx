import { Link, useLocation, useParams } from "react-router-dom";
import { categories } from "../helpers/consts";
import CartIcon from "./icons/CartIcon";
import CartOverlay from "./CartOverlay";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { cartItemLength } = useContext(AppContext);
  const [cartOverlay, setCartOverlay] = useState(false);
  const params = useParams();
  const location = useLocation();

  return (
    <>
      {cartOverlay && (
        <div
          onClick={() => setCartOverlay(false)}
          className="fixed top-0 left-0 z-[9] w-screen h-screen bg-cart-overlay-back"
        ></div>
      )}
      <nav className="grid grid-cols-3 items-center fixed top-0 left-0 w-screen h-20 px-21 bg-white z-10">
        <ul className="flex h-full justify-self-start">
          {categories.map((category) => (
            <li
              key={category}
              className={`${
                params.category === category
                  ? "text-link-hover transition-colors border-b-2 border-b-link-hover"
                  : "hover:text-link-hover transition-colors border-b-2 border-b-transparent hover:border-b-link-hover"
              } cursor-pointer`}
            >
              <Link
                to={`/${category}`}
                data-testid={
                  location.pathname.includes(category)
                    ? "active-category-link"
                    : "category-link"
                }
                className="flex items-center uppercase px-5 h-full w-full"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/all">
          <img
            src="/logo.svg"
            alt="shopping bag"
            className="justify-self-center"
          />
        </Link>
        <button
          data-testid="cart-btn"
          onClick={() => setCartOverlay(!cartOverlay)}
          type="button"
          className="justify-self-end cursor-pointer rounded-full p-2"
        >
          {cartItemLength !== 0 && (
            <div className="relative bottom-3 left-3">
              <span className="font-sans flex justify-center text-sm items-center rounded-full absolute bg-black w-5 h-5 p-1 text-white">
                {cartItemLength && cartItemLength > 99 ? "+99" : cartItemLength}
              </span>
            </div>
          )}
          <CartIcon />
        </button>
        <CartOverlay cartOverlay={cartOverlay} />
      </nav>
    </>
  );
};

export default Navbar;
