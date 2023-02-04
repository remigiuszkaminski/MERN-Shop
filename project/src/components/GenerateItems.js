import { React, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ItemContext } from '../itemsContext.js/ItemContext';
import data from '../data.json'
export default function GenerateItems() {
    const [items, setItems] = useContext(ItemContext);

    useEffect(() => {
        setItems(data.items);
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