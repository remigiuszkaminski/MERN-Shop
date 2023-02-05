import { React, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ItemContext } from '../itemsContext.js/ItemContext';

export default function GenerateItems() {
    const [items, setItems] = useContext(ItemContext);
    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch("http://localhost:5000/getproducts")
            const data = await res.json();
            setItems(data);
        };
        fetchData();

        
    }, [setItems]);
    return (
        <div>
            {items.map((el, id) => (
                <Link to={`/${el.id}`} key={id}>
                    <div key={id}></div>
                </Link>
            ))}
        </div>
    )
}