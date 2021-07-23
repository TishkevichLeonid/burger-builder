import * as actionTypes from "./actionTypes";


export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredient
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredient
    }
}
