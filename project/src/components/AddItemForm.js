import {useFormik} from 'formik';
import React, {useContext} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemContext } from '../itemsContext.js/ItemContext';
export default function DeliveryForm() {
    const [items, setItems] = useContext(ItemContext)
    
    const formik = useFormik({
        initialValues: {
            id: uuidv4(),
            price: 0,
            category: "",
            brand: "",
            title: "",
            description: "",
            strictdescription: "",
            image: "",
            comments: [],
            rating: [5]
        },
        onSubmit: (values) => {
            setItems([...items, values])
            formik.resetForm({
                values: {
                    id: uuidv4(),
                    price: 0,
                    category: "",
                    brand: "",
                    title: "",
                    description: "",
                    strictdescription: "",
                    image: "",
                    comments: [],
                    rating: []
                }
            });

        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'>
                <p className='text-xl mb-4'>Dodaj nowy przedmiot.</p>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='price'
                    type='number'
                    placeholder='Cena'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    />
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='category'
                    placeholder='Kategoria'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    />
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='brand'
                    placeholder='Marka'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.brand}
                    />
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='title'
                    placeholder='Tytuł'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    />
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='description'
                    placeholder='Opis krótki'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    />
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='strictdescription'
                    placeholder='Opis długi'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.strictdescription}
                    />
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='image'
                    placeholder='Link do obrazka'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    />
                </div>
                <button type='submit' className='p-2 bg-green-600 rounded-full text-white'>Dodaj nowy przedmiot</button>
            </form>
        </div>
    )
}
