import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import {connect} from "react-redux";
import * as actionTypes from '../../store/actions/actionTypes'
import * as burgerActions from '../../store/actions/index'

import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     }).catch(err => {this.setState({error: true})})
        this.setState({ingredients: this.props.ings})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchaseState(updatedIngredients) {
        // const ingredients = {
        //   ...this.state.ingredients
        // };

        const ingredients = updatedIngredients
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
        //this.props.history.push({pathname: '/checkout'}) just for test, seems this is a good approach
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BurgerControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientDeleted}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice}/>
                </Aux>)
            orderSummary = (<OrderSummary ingredients={this.props.ings}
                                          price={this.props.totalPrice}
                                          purchaseCanceled={this.purchaseCancelHandler}
                                          purchaseContinued={this.purchaseContinueHandler}/>)
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch(burgerActions.addIngredient(ingredient)),
        onIngredientDeleted: (ingredient) => dispatch(burgerActions.removeIngredient(ingredient))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
