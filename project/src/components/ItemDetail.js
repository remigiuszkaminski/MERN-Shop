import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../actions/CartActions';
import {useFormik} from 'formik';
import { useNavigate } from 'react-router-dom';
export default function ItemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true);
    const [ocena , setOceny] = useState([]);
    const [srednia, setSrednia] = useState(0);
    const [updateItem, setUpdateItem] = useState(false);
    const [admin, setAdmin] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/getproduct/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setItem(data)
                setOceny(data.rating.reduce((acc, el) => {
                    return acc + el
                }, 0))
                setSrednia(ocena / data.rating.length)
                setLoading(false)
                setUpdateItem(false)
            })
    }, [id, ocena, updateItem]);




    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)


    
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

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        } else if (values.name.length > 15) {
            errors.name = 'Must be 15 characters or less';
        }
        if (!values.comment) {
            errors.comment = 'Required';
        } else if (values.comment.length > 100) {
            errors.comment = 'Must be 100 characters or less';
        }
        return errors;
    };


    const formik = useFormik({
        initialValues: {
            name: '',
            comment: '',
        },
        validate,
        onSubmit: values => {
            fetch(`http://localhost:5000/addcomment/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
                    comment: values.comment,
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Dodano nowy komentarz')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            setUpdateItem(true)
            formik.resetForm();
        },
    });

    const ratingOptions = [1, 2, 3, 4, 5]

    const formik2 = useFormik({
        initialValues: {
            rating: 1,
        },
        onSubmit: values => {
            values.rating = parseInt(values.rating)
            fetch(`http://localhost:5000/addrating/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rating: values.rating,
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Dodano nową ocenę')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            setUpdateItem(true)
            formik2.resetForm();
        },
    });




    
    
    return (
        <div className='mx-52'>
            { loading ? (
            <div className='text-5xl'>Loading...</div>
            ) : (
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
                                <div key={i} className='py-2.5 px-4 border-2 rounded-lg mt-2'>{el.name}: {el.comment}</div>
                            ))}
                        </div>
                    </div>
                    <p className='mt-4 text-xl'>Dodaj własną opinie o danym produkcie:</p>
                    <form onSubmit={formik.handleSubmit} className='mt-8 rounded-full focus:outline-0 mb-12'>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Imię'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className='rounded-full shadow-lg p-2 border-2 border-black w-1/6'
                        />
                        <input
                            id='comment'
                            name='comment'
                            type='text'
                            placeholder='Komentarz'
                            onChange={formik.handleChange}
                            value={formik.values.comment}
                            className='rounded-full shadow-lg p-2 border-2 border-black w-5/6 mt-2'
                        />
                        <button type='submit' className='rounded-full shadow-lg p-2 bg-green-600 border-black text-white mt-2 w-full'>Dodaj komentarz</button>
                    </form>
                    <form onSubmit={formik2.handleSubmit} className='mt-8 rounded-full focus:outline-0 mb-12'>
                        <p className='text-xl'>Oceń produkt:</p>
                        <select
                            id='rating'
                            name='rating'
                            {...formik2.getFieldProps('rating')}
                            className='rounded-full shadow-lg p-2 border-2 border-black w-1/6'
                        >
                            {ratingOptions.map((el, i) => (
                                <option key={i} value={el}>{el}</option>
                            ))}
                        </select>
                        <button type='submit' className='rounded-full shadow-lg p-2 bg-green-600 border-black text-white mt-2 w-full'>Dodaj ocenę</button>
                    </form>
                    {admin ? (
                        <div>
                            <p>Usuń produkt</p>
                            <button onClick={
                                () => {
                                    fetch(`http://localhost:5000/deleteproduct/${id}`, {
                                        method: 'DELETE',
                                    })
                                        .then(response => {
                                            if (response.status === 200) {
                                                alert('Produkt został usunięty')
                                                navigate('/')
                                            } else {
                                                alert('Coś poszło nie tak')
                                            }
                                        })
                                        
                                }
                            } className='rounded-full shadow-lg p-2 bg-red-600 border-black text-white mt-2 w-full'>Usuń</button>
                        </div>
                            ) : null }


                </div>


            </div>
        
            
            )}
            </div>
            
    )
}

