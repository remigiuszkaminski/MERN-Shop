import React, {useContext} from 'react';
import { ItemContext } from '../itemsContext.js/ItemContext';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../index.css'
import { addToCart } from '../actions/CartActions';
export default function MainSite() {
    const [items] = useContext(ItemContext);
    const dispatch = useDispatch()


    const randomitems = items
        .sort(() => Math.random() - 0.5)
        .slice(0,8)

    return(
        <div className='mx-52'>
            <p className='text-center text-xl mb-4'>Przykładowe produkty</p>
            <div className='grid grid-cols-4 gap-6 gap-x-1 grid-flow-dense justify-center gap-2.5' >
                {randomitems.map((el, i) => (
                        <div key={i} className='ml-auto mr-auto w-76 h-86 rounded-lg overflow-hidden shadow-lg 1/4 relative' onMouseEnter={(e) => {
                            e.currentTarget.lastChild.style.opacity = 1;
                            e.currentTarget.lastChild.style.pointerEvents = 'auto';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.lastChild.style.opacity = 0;
                            e.currentTarget.lastChild.style.pointerEvents = 'none';
                          }}
                        >
                            <div className='h-64 w-76'>
                                <img className='h-64 align-center w-76 ' src={el.image} alt={el.title}></img>
                            </div>
                            <div className='px-6 py-4 bg-slate-400 h-40 ' >
                                <p className=' text-xs mb-2'>{el.title}</p>
                                <p className=' text-xs mt-2'>{el.description}</p>
                            </div>
                            <div className='text-right relative bottom-14 text-gray-700 text-base mr-2'>Cena bez dostawy: {el.price}$
                            <p>Cena z dostawą: {el.price+10}$</p></div>
                            <div className='absolute top-0 left-0 opacity-0 w-full h-full flex flex-col justify-center items-center transition-opacity' >
                                <button className='mb-4 bg-blue-400 w-6/12 text-base rounded-lg' onClick={() => dispatch(addToCart(el))}>🛒</button>
                                <button className='mb-4 bg-blue-400 w-6/12 text-base rounded-lg'><Link to={`/${el.id}`} className='hover:text-blue-700'>Info 📄</Link></button>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )

}