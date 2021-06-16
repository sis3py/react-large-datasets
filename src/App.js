import './App.css';
import Pagination from './Pagination';
import ProductList from './ProductList';
import { createProducts } from "./helper";
import { usePagination } from './hooks/usePagination';
import { useState, useEffect } from 'react';

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
  } = usePagination({ defaultPageSize: 10, nbItems: nbProducts });

  useEffect(() => {
    setProducts(createProducts(nbProducts));
    setNbItems(nbProducts);
  }, [setNbItems, nbProducts]);

  const filteredProducts = products.slice(startIndex, endIndex).filter(p => p.description.toLowerCase().includes(searchText.toLowerCase()) || p.label.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="App">
      <input type="text" placeholder="Search..." onChange={e => setSearchText(e.target.value)} name="search" />
      <input type="number" placeholder="Nb products to display..." onChange={e => setNbProducts(parseInt(e.target.value || 0))} name="nbProducts" />
      <ProductList products={filteredProducts}/>
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
