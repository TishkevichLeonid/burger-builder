import React, {Component} from "react";
import axios from "../../axios-orders";

import Order from '../../components/Order/Order'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(resp => {
                const fetchOrders = []
                let data = resp.data
                for (let key in data) {
                    fetchOrders.push({
                        ...data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map((order) => (
                        <Order key={order.id}
                               ingredients={order.ingredients}
                               price={order.price}/>
                    )
                )}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)