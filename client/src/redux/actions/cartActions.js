import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

const URL = 'https://flipkartclone-unnx.onrender.com';

export const addToCart = (id, quantity) => async (dispatch) => {
    try { 
        const { data } = await axios.get(`${URL}/product/${id}`);

        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });

    } catch (error) {
        console.log('Error while calling cart API');
    }
};

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

};

export const emptyCart = () => (dispatch) => {
    dispatch({
        type: actionTypes.CART_RESET
    })
};

// cache bust 3