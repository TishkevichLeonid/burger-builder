import React, {Component} from 'react'

import Aux from '../../../hoc/Aux'
import Button from '../../UI/button/Button'

class OrderSummary extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[OrderSummary] DidUpdate')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
            return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                </li>
            )
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                {/*<NavLink to="/checkout" exact> !!!just as another method to add a link to the button!!!*/}
                    <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
                {/*</NavLink>*/}
            </Aux>
        )
    }
}

export default OrderSummary;