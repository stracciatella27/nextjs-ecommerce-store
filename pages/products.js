import React from 'react';
import ProductsGrid from '../components/Products/Productsgrid';
import SlideShow from '../components/Products/Slideshow';
import { getAllProducts } from '../utilities/database/db.mjs';

export default function Products(props) {
  return (
    <div>
      <SlideShow />
      <ProductsGrid
        products={props.products.slice(0, 2)}
        heading="Featured"
        gridColumns={2}
        setCartItemCount={props.setCartItemCount}
      />
      <ProductsGrid
        products={props.products}
        heading="All Products"
        gridColumns={3}
        setCartItemCount={props.setCartItemCount}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const products = await getAllProducts();

  return {
    props: { products }, // will be passed to the page component as props
  };
}
