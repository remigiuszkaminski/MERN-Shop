import AddItemForm from './AddItemForm';
import React, {useState, useEffect} from 'react'


export default function Admin() {

    const [total, setTotal] = useState(0);
    const [commentsVal, setCommentsVal] = useState([]);
    const [categorySum, setCategorySum] = useState([]);
    const [bestRate, setBestRate] = useState([]);
    const [cheapestNotAccesory, setCheapestNotAccesory] = useState([]);
    const [mostActiveUsers, setMostActiveUsers] = useState([]);
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

            
        } catch (err) {
            console.log(err);
        }
        };
        fetchData();
    }, [setTotal, setCommentsVal]);


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
            </div>
        </div>
    )
}