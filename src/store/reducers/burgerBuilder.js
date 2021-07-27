import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        // return {
        //     ...state,
        //     ingredients: {
        //         ...state.ingredients,
        //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        //     },
        //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        // }
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action)
        // return {
        //     ...state,
        //     ingredients: action.ingredients,
        //     totalPrice: 4,
        //     error: false
        // }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
    }
    return state
}



const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    })
}

const removeIngredient = (state, action) => {
    const updatedIngredientRemove = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredientsRemove = updateObject(state.ingredients, updatedIngredientRemove)
    const updatedStateRemove = {
        ingredients: updatedIngredientsRemove,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedStateRemove)
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}

export default burgerBuilder
