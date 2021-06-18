import './App.css';
import ProductList from './ProductList';
import { createProducts, filterProducts } from "./helper";
import { useInfiniteScrolling } from './hooks/useInfiniteScrolling';
import { useState, useEffect, useMemo } from 'react';

const InfiniteScrollingApp = () =>{
  const [searchText, setSearchText] = useState("");
  const [nbProducts, setNbProducts] = useState(0);
  const [products, setProducts] = useState([]);

  const {
    setNbItems, 
    endIndex,
    loaderRef,
  } = useInfiniteScrolling({ defaultPageSize: 5, nbItems: nbProducts });

  // Apply filters
  const filteredProducts = useMemo(() => filterProducts(products, searchText), [products, searchText]);

  // Apply infinite scrolling
  const paginatedProducts = useMemo(() => filteredProducts.slice(0, endIndex), [filteredProducts, endIndex]);

  // Recompute when the number of products is updated
  useEffect(() => {
    setProducts(createProducts(nbProducts));
    setNbItems(nbProducts);
  }, [setNbItems, nbProducts]);

  // Recompute when the search text is updated
  useEffect(() => {
    setNbItems(filteredProducts.length);
  }, [setNbItems, filteredProducts]);


  return (
    <div className="App">
      <input type="text" placeholder="Search..." onChange={e => setSearchText(e.target.value)} name="search" />
      <input type="number" placeholder="Nb products to display..." onChange={e => setNbProducts(parseInt(e.target.value || 0))} name="nbProducts" />
      <ProductList products={paginatedProducts}/>
      <div ref={loaderRef} />
    </div>
  );
}

export default InfiniteScrollingApp;
