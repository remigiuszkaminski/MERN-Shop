import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart, addToCart, deleteDeliveryPriceFromTotal } from '../actions/CartActions';
import DeliveryForm from './DeliveryForm'
import { resetDeliveryForm } from '../actions/DeliveryActions';
import { useNavigate } from 'react-router-dom';
import { resetWholeCart } from '../actions/CartActions';
export default function Cart() {
    const cartItemsTotal = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const [ selectedItem, setSelectedItem ] = useState({});
    const [ quantity, setQuantity ] = useState(1);
    const navigate = useNavigate()
    const deliveryFormik = useSelector((state) => state.delivery)
    const handleSelectItem = (item) => {
        setSelectedItem(item);
    }
    const handleChangeOfQuantity = (event) => {
        setQuantity(event.target.value);
    }

    if(cartItemsTotal.items.length === 0){
        cartItemsTotal.total = 0

        return(
            <div className='mx-52 text-6xl text-center'>Koszyk jest pusty!</div>
        )
    }

    let isThereSmth = deliveryFormik.length === 1

    console.log(cartItemsTotal)

    console.log(deliveryFormik)
    function completingDelivery() {
        fetch('http://localhost:5000/addhistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: cartItemsTotal.total
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            dispatch(resetDeliveryForm())
            dispatch(resetWholeCart())
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }


    function handleCheckSubmit(e) {
        e.preventDefault()
        completingDelivery()
        navigate('/cart/completed')

    }

    


    if(cartItemsTotal.items.length === 0 || cartItemsTotal.total < 0){
        cartItemsTotal.total = 0
        return(
            <div className='text-xl relative left-52'>The Cart is empty!</div>
        )
    }
    return (
        <div className='flex flex-row mx-52'>
            <div className='w-1/2'>
                <p className='text-center text-gray-900 text-xl mb-4'>Koszyk z zakupami</p>
                <div className='flex justify-center'>
                    <ul className='bg-white rounded-lg border border-gray-200 w-96 text-gray-900'>
                        {cartItemsTotal.items.map((el, i) => (
                            <li key={i} className='px-6 py-2 border-b border-gray-200 w-full rounded-t-lg'>
                                {el.title} - x{el.quantity}
                                <br></br>
                                <button className='p-2 bg-green-600 rounded-full' onClick={() => handleSelectItem(el)}> Ilość: -/+ </button>
                                {selectedItem.title === el.title && (
                                    <>
                                        <button className='p-2 bg-green-600 rounded-full' onClick={(e) => {
                                            e.preventDefault()
                                            for(let i=0;i<quantity;i++){
                                                dispatch(addToCart(el))
                                            }
                                            setQuantity(1)
                                        }}>Dodaj</button>
                                        <input type="number" min={1} value={quantity} onChange={handleChangeOfQuantity} className='w-14'/>
                                        <button className='p-2 bg-green-600 rounded-full' onClick={(e) => {
                                            e.preventDefault()
                                            if(quantity > selectedItem.quantity) {
                                                alert("You can't remove more items than you have in the cart!");
                                                return;
                                            }
                                            for(let i=0;i<quantity;i++){
                                                dispatch(deleteFromCart(el))
                                            }
                                            setQuantity(1)
                                        }}>Usuń</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
            </div>
            <div className='text-center'>
                Razem: {cartItemsTotal.total.toFixed(2)}
            </div>

            </div>
            <div className='flex justify-items-end items-end w-1/2 ml-10'>
                {isThereSmth ? (
                    <div>
                        <ul className='bg-white rounded-lg border border-gray-200 w-96 text-gray-900'>
                            {deliveryFormik.map((el, i) => (
                                <div key={i} className='justify-self-end'>
                                    <li className='px-6 py-2 border-b border-gray-200 w-full rounded-t-lg'>Imie: {el.name}</li>
                                    <li className='px-6 py-2 border-b border-gray-200 w-full rounded-t-lg'>Nazwisko: {el.lastname}</li>
                                    <li className='px-6 py-2 border-b border-gray-200 w-full rounded-t-lg'>Adres: {el.address}</li>
                                    <li className='px-6 py-2 border-b border-gray-200 w-full rounded-t-lg'>Kod pocztowy: {el.postcode}</li>
                                    <li className='px-6 py-2 border-b border-gray-200 w-full rounded-t-lg'>Miasto: {el.city}</li>
                                    <li className='px-6 py-2 border-b border-gray-200 w-full rounded-t-lg'>Numer Telefonu: {el.telephone}</li>
                                    <li className='px-6 py-2 border-b border-gray-200 w-full rounded-t-lg'>Email: {el.email}</li>
                                    <li className='px-6 py-2 border-b border-gray-200 w-full rounded-t-lg'>Sposób dostawy: {el.curier}</li>
                                    <button className='p-2 bg-green-600 w-full rounded-b-lg' onClick={(e) => {
                                        e.preventDefault()
                                        if(el.curier === 'Przesyłka kurierska za pobraniem - 10$'){
                                            dispatch(deleteDeliveryPriceFromTotal(10))
                                        }
                                        dispatch(resetDeliveryForm())
                                        
                                    }}>Wypełnij formularz na nowo</button>
                                </div>
                                
                            ))}
                            
                        </ul>
                        <div>
                            <form onSubmit={handleCheckSubmit} className='px-6 py-2 bg-white rounded-lg border border-gray-200 w-96 text-gray-900 mt-2'>
                                <input type='checkbox' required className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                                <input type='submit' value='Podpierdzam zakup danych produktów.' className='ml-2 p-2 bg-green-600 rounded-full' />
                            </form>
                            
                        </div>
                    </div>
                    
                ) : (
                    <DeliveryForm />
                )}
            </div>
        </div>
    )
}
