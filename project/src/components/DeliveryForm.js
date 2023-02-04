import {useFormik} from 'formik';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch} from 'react-redux';
import { updateDeliveryAdd } from '../actions/DeliveryActions';
import { addDeliveryPriceToTotal } from '../actions/CartActions';
export default function DeliveryForm() {
    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email required'
        } 
        else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address'
        }

        if (!values.name) {
            errors.name = 'Name required'
        } else if (values.name.length > 25) {
            errors.name = 'Name is too long'
        } else if (
            !/^[a-zA-Z]+$/i.test(values.name)
        ) {
            errors.name = 'Only letters allowed'
        }

        if (!values.lastname) {
            errors.lastname = 'lastname required'
        } else if (values.lastname.length > 20) {
            errors.lastname = 'Lastname is too long'
        } else if (
            !/^[a-zA-Z]+$/i.test(values.lastname)
        ) {
            errors.lastname = 'Only letters allowed'
        }

        if (!values.address) {
            errors.address = 'Address Required'
        } else if (
            !/^[a-zA-Z]+(\d)?\s\d{1,3}$/i.test(values.address)
        ) {
            errors.address = 'Invalid addres'
        }

        if (!values.postcode) {
            errors.postcode = 'Postcode required'
        } 
        else if (
            !/^(\d{2}-\d{3})$/i.test(values.postcode)
        ) {
            errors.postcode = "Invalid postcode"
        }

        if (!values.city) {
            errors.city = 'City required'
        } else if (
            !/^[a-zA-Z][a-zA-Z\s'-]*$/.test(values.city)
        ) {
            errors.city = 'Invalid city name'
        }

        if (!values.telephone) {
            errors.telephone = 'Telephone required'
        } else if (
            !/^(\d{3}-\d{3}-\d{3})$/i.test(values.telephone)
        ) {
            errors.telephone = "invalid telephone number"
        }
        
        if (!values.curier) {
            errors.curier = 'Wybierz opcje dostawy!'
        }


        return errors
    }
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: uuidv4(),
            name: '',
            lastname: '',
            address: '',
            postcode: '',
            city: '',
            telephone: '',
            email: '',
            curier: ''
        },
        validate,
        onSubmit: (values) => {
            if(values.curier === 'Przesyłka kurierska za pobraniem - 10$'){
                dispatch(addDeliveryPriceToTotal(10))
            }
            dispatch(updateDeliveryAdd(values))
            formik.resetForm({
                values: {
                    id: uuidv4(),
                    name: '',
                    lastname: '',
                    address: '',
                    postcode: '',
                    city: '',
                    telephone: '',
                    email: '',
                    curier: ''
                }
            });

        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'>
                <p className='text-xl mb-4'>Formularz dostawy</p>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='name'
                    placeholder='Name'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.name}
                     />
                     {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='lastname'
                    placeholder='Lastname'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    />
                    {formik.touched.lastname && formik.errors.lastname ? (
                        <div>{formik.errors.lastname}</div>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='address'
                    placeholder='Address Np: Brzechwy 8'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div>{formik.errors.address}</div>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='postcode'
                    placeholder='Postcode'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.postcode}
                    />
                    {formik.touched.postcode && formik.errors.postcode ? (
                        <div>{formik.errors.postcode}</div>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='city'
                    placeholder='City'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    />
                    {formik.touched.city && formik.errors.city ? (
                        <div>{formik.errors.city}</div>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='telephone'
                    placeholder='Telephone 666-666-666 format.'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.telephone}
                    />
                    {formik.touched.telephone && formik.errors.telephone ? (
                        <div>{formik.errors.telephone}</div>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='email'
                    placeholder='Email'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className='mb-4 flex flex-col'>
                    Wybierz rodzaj dostawy:
                    <label>
                        <input
                        className='mb-3 mr-2'
                        name='curier'
                        type='radio'
                        value='Wybrany przez Ciebie Paczkomat - 0$'
                        checked={formik.values.curier === 'Wybrany przez Ciebie Paczkomat - 0$'}
                        onChange={formik.handleChange}
                        />
                        Wybrany przez Ciebie Paczkomat - 0$
                    </label>
                    <label>
                        <input
                        className='mb-3 mr-2'
                        name='curier'
                        type='radio'
                        value='Przesyłka kurierska za pobraniem - 10$'
                        checked={formik.values.curier === 'Przesyłka kurierska za pobraniem - 10$'}
                        onChange={formik.handleChange}
                        />
                        Przesyłka kurierska za pobraniem - 10$
                    </label>
                    <label>
                        <input
                        className='mb-3 mr-2'
                        name='curier'
                        type='radio'
                        value='Odbiór osobisty - 0$'
                        checked={formik.values.curier === 'Odbiór osobisty - 0$'}
                        onChange={formik.handleChange}
                        />
                        Odbiór osobisty - 0$
                    </label>
                    {formik.touched.curier && formik.errors.curier ? (
                        <div>{formik.errors.curier}</div>
                    ) : null}

                </div>
                <button type='submit' className='p-2 bg-green-600 rounded-full text-white'>Dodaj dane dostawy</button>
            </form>
        </div>
    )
}
