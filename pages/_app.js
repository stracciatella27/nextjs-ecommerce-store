import { css, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import Footer from '../components/PageLayout/Footer';
import Header from '../components/PageLayout/Header';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  :root {
    font-family: 'Montserrat', sans-serif;
  }

  body {
    margin: 0;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
    margin: 10px 0;
    width: 50%;
    height: 2em;
    font-family: inherit;
    color: white;
    background-color: black;
    cursor: pointer;

    &:active {
      transform: scale(0.95);
      transition: ease;
    }

    &:disabled {
      filter: opacity(0.2);

      &:active {
        transform: scale(1);
      }
    }
  }
`;

function MyApp({ Component, pageProps }) {
  const [isHome, setIsHome] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (Component.name !== 'Home') {
      setIsHome(false);
    } else {
      setIsHome(true);
    }
  }, [Component.name]);

  return (
    <div>
      <Global styles={globalStyles} />
      <Header
        textColor={isHome ? 'white' : 'black'}
        cartItemCount={cartItemCount}
        setCartItemCount={setCartItemCount}
      />
      <Component {...pageProps} setCartItemCount={setCartItemCount} />
      <Footer
        textColor={isHome ? 'white' : 'black'}
        position={isHome ? 'absolute' : 'static'}
      />
    </div>
  );
}

export default MyApp;
