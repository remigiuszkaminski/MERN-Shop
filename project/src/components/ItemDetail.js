import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../actions/CartActions';
import { ItemContext } from '../itemsContext.js/ItemContext';
export default function ItemDetail() {
    const { id } = useParams();
    const [items] = useContext(ItemContext)
    const item = items.find((el) => el.id.toString() === id)

    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [comm, setComm] = useState('')


    
    function handleQuantityChange(e) {
        
        setQuantity(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        for(let i = 0;i<quantity;i++){
            dispatch(addToCart(item))
        }
        setQuantity(1)
    }

    function handleOnBlur(e) {
        e.preventDefault()
        setQuantity(1)
    }

    let ocena = item.rating.reduce((acc, el) => {
        return acc + el
    }, 0)

    let srednia = ocena / item.rating.length

    function handleFormSubmit(e) {
        e.preventDefault()
        item.comments.push(comm)
        setComm('')
    }
    function handleCommChange(e) {
        setComm(e.target.value)
    }
    
    return (
        <div className='mx-52'>
            <div className='flex mx-14 grow-0 flex-nowrap'>
                <div className='h-128 w-128 mt-18 w-1/2 shrink-0'>
                    <img className='h-128 w-128 rounded-lg shadow-lg' src={item.image} alt={item.title}></img>
                    <form onSubmit={handleSubmit} className='flex '>
                        <input type='number' value={quantity} className='border-1.5 rounded-full shadow-lg w-14 p-2 border-black mt-2' onChange={handleQuantityChange} onFocus={() => setQuantity('')} onBlur={handleOnBlur} />
                        <input type='submit' className='rounded-full shadow-lg p-2 bg-green-600 border-black text-white mt-2 w-full' value='Dodaj do koszyka 🛒' />
                    </form>
                    <div>
                        <p className='text-3xl mt-2'>Opcje dostawy:</p>
                        <div className='mt-4 h-max py-2.5 px-4 text-sm font-semibold text-white bg-gray-400 rounded-l-lg rounded-r-lg shadow-lg'>
                            <div className='py-2.5 px-4 border-2 rounded-full mt-2'>Paczkomat - 0$</div>
                            <div className='py-2.5 px-4 border-2 rounded-full mt-2'>Kurier - 10$</div>
                            <div className='py-2.5 px-4 border-2 rounded-full mt-2'>Odbiór osobisty - 0$</div>
                        </div>
                    </div>
                </div>
                <div className='relative left-20 w-full'>
                    <div className='text-5xl'>{item.title}</div>
                    <p>Średnia ocena: {srednia.toFixed(1)}/5⭐</p>
                    <p className='text-2xl mt-2'>Cena produktu: {item.price}$</p>
                    <div className='flex flex-wrap font-bold mt-8'>Opis danego przedmiotu: <p className='font-normal'>{item.strictdescription}</p></div>
                    <div className='mt-8'>
                        <p className='text-4xl'>Opinie:</p>
                        <div className='mt-4 h-max py-2.5 px-4 text-sm font-semibold text-white bg-gray-400 rounded-l-lg rounded-r-lg shadow-lg'>
                            {item.comments.map((el, i) => (
                                <div key={i} className='py-2.5 px-4 border-2 rounded-lg mt-2'>{el}</div>
                            ))}
                        </div>
                    </div>
                    <p className='mt-4 text-xl'>Dodaj własną opinie o danym produkcie:</p>
                        <form onSubmit={handleFormSubmit} className='mt-8 rounded-full focus:outline-0 mb-12'>
                                <input type='text' value={comm} onChange={handleCommChange} className='rounded-t-lg shadow-lg w-full p-2 mt-2 h-full border-2 focus:outline-none focus:shadow-outline' required />
                                <input type='submit' value='Dodaj opinie' className='rounded-b-lg shadow-lg w-full p-2 bg-gray-400 border-black text-white' />
                        </form>
                </div>
            </div>
        </div>
    )
}

