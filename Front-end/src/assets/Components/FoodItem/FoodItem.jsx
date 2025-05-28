import React, { useContext } from 'react';
import { files } from '../../files/files';
import { StoreContext } from '../../../context/StoreContext'
import './FoodItem.css';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={url + "/images/" + image} alt={name} />
                {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={files.add_icon_white} alt='Add to cart' />
                ) : (
                    <div className="food-item-counter">
                        <img onClick={() => removeFromCart(id)} src={files.remove_icon_red} alt="Remove one" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={files.add_icon_green} alt="Add one more" />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={files.rating_stars} alt="Rating" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price"><b>₹</b>{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;

