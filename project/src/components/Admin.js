import AddItemForm from './AddItemForm';
import React, {useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
export default function Admin() {

    const [total, setTotal] = useState(0);
    const [commentsVal, setCommentsVal] = useState([]);
    const [categorySum, setCategorySum] = useState([]);
    const [bestRate, setBestRate] = useState([]);
    const [cheapestNotAccesory, setCheapestNotAccesory] = useState([]);
    const [mostActiveUsers, setMostActiveUsers] = useState([]);
    const [productCount, setProductCount] = useState([]);
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);
    const [expensiveNotAccessory, setExpensiveNotAccessory] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
            const resTotal = await fetch("http://localhost:5000/getsum")
            const dataTotal = await resTotal.json();
            setTotal(dataTotal[0].sum.toFixed(2));


            const resCommentsVal = await fetch("http://localhost:5000/getcommentsval")
            const dataCommentsVal = await resCommentsVal.json();
            setCommentsVal(dataCommentsVal);

            const resCategorySum = await fetch("http://localhost:5000/getcategorysum")
            const dataCategorySum = await resCategorySum.json();
            setCategorySum(dataCategorySum);

            const resBestRate = await fetchBestRate();
            setBestRate(resBestRate);

            const resCheapestNotAccesory = await fetchCheapestNotAccesory();
            setCheapestNotAccesory(resCheapestNotAccesory);

            const resMostActiveUsers = await fetchMostActiveUsers();
            setMostActiveUsers(resMostActiveUsers);

            const resProductCount = await fetchHowManyItemsShopHave();
            setProductCount(resProductCount[0].count);

            const resHistory = await getHistory();
            setHistory(resHistory);
            
            if(search !== "") {
                const resSearchProducts = await searchForItem();
                setSearchProducts(resSearchProducts);
            } else {
                const resSearchProducts = await searchForItemAll();
                setSearchProducts(resSearchProducts);
            }

            const resExpensiveNotAccessory = await fetchExpensiveNotAccessory();
            setExpensiveNotAccessory(resExpensiveNotAccessory);




            
        } catch (err) {
            console.log(err);
        }
        };
        fetchData();
    }, [setTotal, setCommentsVal, search]);

    const formik = useFormik({
        initialValues: {
            search: "",
        },
        onSubmit: (values) => {
            setSearch(values.search);
        }
    });

    function fetchBestRate() {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:5000/getbestrating")
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }

    function fetchCheapestNotAccesory() {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:5000/getcheapest")
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }

    function fetchMostActiveUsers() {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:5000/getmostactiveuser")
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }

    function fetchHowManyItemsShopHave() {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:5000/getproductscount")
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }

    function getHistory() {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:5000/gethistory")
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }
    
    function searchForItem() {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:5000/search/${search}`)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }

    // const searchForItem = useCallback(() => {
    //     return new Promise((resolve, reject) => {
    //         fetch(`http://localhost:5000/search/${search}`)
    //         .then((res) => res.json())
    //         .then((data) => resolve(data))
    //         .catch((err) => reject(err));
    //     });
    // }, [search]);

    function searchForItemAll() {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:5000/getproducts")
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }

    function fetchExpensiveNotAccessory() {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:5000/getmostexpensive")
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }


    return(
        <div className="mx-52">
            <p className='text-4xl text-center mb-6'>Panel Admina</p>
            <div className='text-center flex'>
                <AddItemForm />
                <div className='ml-4 text-left'>
                    <div className='text-2xl'>Suma wszystkich produktów: {total} zł</div>
                    <div className='text-2xl'>Produkt i ilość komenatrzy pod nim:
                        {commentsVal.map((el) => (
                            <div key={el._id} className='text-xs'>Produkt: {el.title}, ilość komenatrzy: {el.commentsCount}</div>
                        ))}
                    </div>
                    <div className='text-2xl'>Kategorie i ilość produktów dla danej:
                        {categorySum.map((el) => (
                            <div key={el._id} className='text-xs'>Kategoria: {el._id}, ilość produktów: {el.count}</div>
                        ))}
                    </div>
                    <div className='text-2xl'>Produkty z najwyższą oceną:
                        {bestRate.map((el) => (
                            <div key={el._id} className='text-xs'>Produkt: {el.title}, ilość ocen: {el.ratingCount}, średnia ocena: {el.ratingAvg.toFixed(2)}</div>
                        ))}
                    </div>
                    <div className='text-2xl'>Najtańsze produkt - tylko sprzęt:
                        {cheapestNotAccesory.map((el) => (
                            <div key={el._id} className='text-xs'>Produkt: {el.title}, cena: {el.price} zł</div>
                        ))}
                    </div>
                    <div className='text-2xl'>Najaktywniejsi użytkownicy:
                        {mostActiveUsers.map((el) => (
                            <div key={el._id} className='text-xs'>Użytkownik: {el._id}, ilość komentarzy: {el.count}</div>
                        ))}
                    </div>
                </div>
                <div className='ml-8 text-left'>
                    <div className='text-2xl'>Ilość produktów w sklepie: {productCount}</div>
                    <div className='text-2xl'>Historia:
                        {history.map((el) => (
                            <div key={el._id} className='text-xs'>Ilość zamówień: {el.count}, Łączna kwota zamówień: {el.sum.toFixed(2)}</div>
                        ))}
                    </div>
                    <div className='text-2xl'>Najdroższe produkt - tylko sprzęt:
                        {expensiveNotAccessory.map((el) => (
                            <div key={el._id} className='text-xs'>Produkt: {el.title}, cena: {el.price} zł</div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className='text-2xl'>Wyszukiwarka produktów:</div>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        id="search"
                        name="search"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.search}
                        className='border-2 border-black rounded-lg'
                    />
                    <button type="submit" className='border-2 border-black rounded-lg'>Wyszukaj</button>
                </form>
                <div className='text-2xl'>Wyniki wyszukiwania:
                <ul className='grid grid-cols-6'>
                    {searchProducts.map((el) => (
                        <li key={el._id}>
                        <div key={el._id} className='w-76 h-86 rounded-lg overflow-hidden shadow-lg 1/4 relative' onMouseEnter={(e) => {
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
                            <button className='mb-4 bg-blue-400 w-6/12 text-base rounded-lg'><Link to={`/${el._id}`} className='hover:text-blue-700'>Info 📄</Link></button>
                        </div>
                        </div>
                        </li>
                    ))}
                </ul>
                </div>

            </div>
        </div>
    )
}