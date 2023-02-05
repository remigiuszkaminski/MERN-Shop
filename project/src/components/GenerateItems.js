import { React, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ItemContext } from '../itemsContext.js/ItemContext';

export default function GenerateItems() {
    const [items, setItems] = useContext(ItemContext);
    useEffect(() => {
        fetch("http://localhost:5000/getproducts")
            .then((res) => res.json())
            .then((data) => {
                setItems(data);

                
            }
            );

        
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