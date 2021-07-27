import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from '../../../store/actions/index'

import Button from '../../../components/UI/button/Button'
import classes from "./ContactData.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'Fastest',
                valid: true
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let valid = true

        if (rules.required) {
            valid = value.trim() !== '' && valid
        }

        if (rules.minLength) {
            valid = value.length >= rules.minLength && valid
        }

        if (rules.maxLength) {
            valid = value.length <= rules.maxLength && valid
        }
        return valid
    }

    orderHandler = (event) => {
        event.preventDefault()
        // this.setState({loading: true})
        const formData = {}
        for (let formElId in this.state.orderForm) {
            formData[formElId] = this.state.orderForm[formElId].value
        }
        const order = {
            ingredients: this.props.igns,
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurger(order)

        // axios1.post('/orders.json', order)
        // axios.post('/orders.json', order)
        //     .then(resp => {
        //         this.setState({loading: false})
        //         this.props.history.push("/")
        //     })
        //     .catch(error => {
        //         this.setState({loading: false})
        //     })
    }

    inputChangeHandler = (event, inputKey) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {...updatedOrderForm[inputKey]}
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputKey] = updatedFormElement

        let formIsValid = true
        for (let inputI in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputI].valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formEl => (
                    <Input key={formEl.id}
                           elementType={formEl.config.elementType}
                           elementConfig={formEl.config.elementConfig}
                           invalid={!formEl.config.valid}
                           shouldValidate={formEl.config.validation}
                           value={formEl.config.value}
                           touched={formEl.config.touched}
                           changed={(event) => this.inputChangeHandler(event, formEl.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        igns: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))