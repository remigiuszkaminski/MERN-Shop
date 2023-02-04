import React, {useState, useContext} from 'react';
import { ItemContext } from '../itemsContext.js/ItemContext';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/CartActions';
export default function SearchPanel() {

    const [items] = useContext(ItemContext)

    const [ category, setCategory] = useState('Wszystkie')
    const [ brand, setBrand] = useState('Wszystkie')
    const [ filterPrice, setFilterPrice] = useState({min:0, max:Infinity})
    const [ sorted, setSorted ] = useState(undefined)
    const [ sortedRating, setSortedRating ] = useState(false)
    const dispatch = useDispatch();

    function handleCategoryChange(e) {
        setCategory(e.target.value)
        setBrand('Wszystkie')
    }

    function handleBrandChange(e) {
        setBrand(e.target.value)
    }

    function handleFilterPriceChange(e) {
        e.preventDefault();
        if(e.target.value === '' && e.target.name ==='max'){
            setFilterPrice({...filterPrice, max:Infinity})
        } else {
            setFilterPrice({...filterPrice, [e.target.name]: e.target.value})
        }
    }

    function handleSetSortMin() {
        if(sorted === undefined){
            setSorted(true)
        } else if(sorted === true){
            setSorted(undefined)
        }
    }
    function handleSetSortMax() {
        if(sorted === undefined){
            setSorted(false)
        } else if(sorted === false){
            setSorted(undefined)
        }
    }

    function handleSetRating() {
        if(sortedRating === false) {
            setSortedRating(true)
        } else {
            setSortedRating(false)
        }
    }


    let filteredItems = []
    if (category === 'Wszystkie') {
        filteredItems = items.filter(
            (el) => el.price >= filterPrice.min && el.price <= filterPrice.max
        );
      } else {
        if (brand === 'Wszystkie') {
            filteredItems = items.filter(
                (el) => el.category === category && el.price >= filterPrice.min && el.price <= filterPrice.max
            );
        } else {
            filteredItems = items.filter(
                (el) => el.category === category && el.price >= filterPrice.min && el.price <= filterPrice.max && el.brand === brand
            );
        }

      }


    const eachCategory = [...new Set(items.map((el) => el.category))]
    const eachBrand = [...new Set(items.filter((el) => el.category === category).map((el) => el.brand))]
    if (sorted) {
        filteredItems.sort((a,b) => a.price - b.price);
    } else if (sorted === false){
        filteredItems.sort((a,b) => b.price - a.price);
    } else if (sorted === undefined){
        filteredItems.sort((a,b) => a.id - b.id)
    }

    if(sortedRating) {
        filteredItems.sort((a, b) => {
            const avgA = a.rating.reduce((acc, el) => acc + el) / a.rating.length;
            const avgB = b.rating.reduce((acc, el) => acc + el) / b.rating.length;
            return avgB - avgA
        })
    }

    return(
        <div className='flex flex-row mx-52 mb-8'>
            
            
            <div className='w-1/3'>
                <div className='grid grid-cols-1'>
                    <p className='bg-gray-600 w-44 text-white rounded-t-lg text-xl p-2'>Filtry:</p>
                    <label className='items-center h-24 py-2.5 px-4 text-sm font-semibold text-center text-white bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 w-44'>
                        <p className=''>Wybierz kategorie: </p>
                        <select  value={category} onChange={handleCategoryChange} className='bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full'>
                            <option value='Wszystkie' className=' px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Wszystko</option>
                            {eachCategory.map((el, i) => (
                                <option key={i} value={el} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                    {el}
                                </option>
                            ))}
                        </select>

                    </label>

                    <label className='items-center h-24 py-2.5 px-4 text-sm font-semibold text-center text-white bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 w-44'>
                        <p className=''>Wybierz markę: </p>
                        <select  value={brand} onChange={handleBrandChange} className='bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full'>
                            <option value='Wszystkie' className=' px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Wszystko</option>
                            {eachBrand.map((el, i) => (
                                <option key={i} value={el} className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                    {el}
                                </option>
                            ))}
                        </select>

                    </label>
                    
                    <label className='grid grid-cols-1 items-center h-24 py-2.5 px-4 text-sm text-center text-white bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 w-44 h-66'>
                        <p className='font-semibold'>Posortuj po:</p>
                        <div className='grid grid-cols-2 w-full h-full'>
                            <input type="checkbox" className='bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5' onChange={handleSetSortMin} disabled={sorted===false || sortedRating ===true} /> Najtańszej cenie
                            <input type="checkbox" className='bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5' onChange={handleSetSortMax} disabled={sorted===true || sortedRating===true} /> Najdroższej cenie
                            <input type="checkbox" className='bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5' onChange={handleSetRating} disabled={sorted===false || sorted===true}/> Najwyższej ocenie
                        </div>

                    </label>

                
                    <label className='grid grid-cols-1 items-center h-24 py-2.5 px-4 text-sm font-semibold text-center text-white bg-gray-600 rounded-b-lg focus:ring-4 focus:outline-none focus:ring-gray-100 w-44 h-66'>
                        <p className=''>Wybierz przedział cenowy:</p>
                        <div className='grid grid-cols-1 w-full h-full'>
                            <input type="number" min="0" name="min" placeholder='Min' className='bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5' value={filterPrice.min} onChange={handleFilterPriceChange} />
                            <input type="number" min="0" name="max" placeholder='Max' className='bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5' value={filterPrice.max} onChange={handleFilterPriceChange} onBlur={handleFilterPriceChange}/>
                        </div>

                    </label>
                </div>
            </div>
            <div className='flex w-2/3'>
                <ul className='grid grid-cols-3 gap-24'>
                    {filteredItems.map((el, i) => (
                        <li key={el.id}>
                            <div key={i} className='w-76 h-86 rounded-lg overflow-hidden shadow-lg 1/4 relative' onMouseEnter={(e) => {
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
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}