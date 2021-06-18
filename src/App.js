import './App.css';
import Pagination from './Pagination';
import ProductList from './ProductList';
import { createProducts, filterProducts } from "./helper";
import { usePagination } from './hooks/usePagination';
import { useState, useEffect, useMemo } from 'react';

const App = () =>{
  const [searchText, setSearchText] = useState("");
  const [nbProducts, setNbProducts] = useState(0);
  const [products, setProducts] = useState([]);

  const {
    page, 
    nbPages,
    setNbItems, 
    setNextPage, 
    setPreviousPage,
    isNextEnabled,
    isPreviousEnabled,
    startIndex,
    endIndex
  } = usePagination({ defaultPageSize: 5, nbItems: nbProducts });

  // Apply filters
  const filteredProducts = useMemo(() => filterProducts(products, searchText), [products, searchText]);

  // Apply pagination
  const paginatedProducts = useMemo(() => filteredProducts.slice(startIndex, endIndex), [filteredProducts, startIndex, endIndex]);

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
      <Pagination 
        setPreviousPage={setPreviousPage} 
        setNextPage={setNextPage} 
        isPreviousEnabled={isPreviousEnabled} 
        isNextEnabled={isNextEnabled} 
        page={page} 
        nbPages={nbPages}
      />
    </div>
  );
}

export default App;
