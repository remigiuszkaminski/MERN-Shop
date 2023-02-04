import './App.css';
import './index.css'
import React, {useState} from 'react'
import { ItemContext } from './itemsContext.js/ItemContext';
import MainSite from './components/MainSite';
import { Routes, Route } from 'react-router-dom';
import WrongSite from './components/WrongSite';
import NavBar from './components/NavBar';
import ItemDetail from './components/ItemDetail';
import GenerateItems from './components/GenerateItems';
import Cart from './components/Cart'
import CompletedOrder from './components/CompletedOrder';
import SearchPanel from './components/SearchPanel';
import Admin from './components/Admin';

function App() {
  const [items, setItems] = useState([])

  return (
    <div>
    <ItemContext.Provider value={[items, setItems]}>
      <NavBar />
      <GenerateItems />
      <Routes>
        <Route path='/' element={<MainSite />} />
        <Route path=':id' element={<ItemDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart/completed' element={<CompletedOrder />} />
        <Route path='/search' element={<SearchPanel />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<WrongSite />} />
      </Routes>
    </ItemContext.Provider>
    </div>
  );
}

export default App;
