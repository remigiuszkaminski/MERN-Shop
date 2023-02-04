import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function NavBar() {
    const cartlist = useSelector((state) => state.cart)
    let lencart = cartlist.items.length
    console.log(cartlist)
    return(
        <div className='bg-gray-600 mb-20'>
            <div className='flex justify-between'>
                    <div className='text-2xl text-white font-bold uppercase justify-self-start my-2 ml-2 flex-grow-0'>KONKUTER</div>
                    <div className='ml-auto text-white mt-auto mb-auto flex-grow-1'> <Link to="/">Strona Główna</Link></div>
                    <div className='ml-auto text-white mt-auto mb-auto flex-grow-1'> <Link to='/search'>Wyszukiwarka</Link></div>
                    <div className='ml-auto text-white mt-auto mb-auto flex-grow-1'> <Link to='/admin'>Admin</Link></div>
                    <div className='ml-auto text-white mt-auto mb-auto mr-4 align-self-end ml-auto '><Link to='/cart/'>Koszyk 🛒</Link>
                        <p className='inline-flex text-black bg-red-700 rounded-full p-1 text-xs'><Link to='/cart/'>{lencart} </Link></p>
                    </div>
            </div>
        </div>

    )
}