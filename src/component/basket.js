import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Firebase from './Firebase/firebase';



export default class Basket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            items: []
        };

    }



    componentWillMount() {

        const isLoggedin = localStorage.getItem('isLoggedin') === 'true';

        if (isLoggedin) {

            const email = isLoggedin ? localStorage.getItem('email') : '';

            /* Create reference to messages in Firebase Database */
            let itemRef = Firebase.database().ref('order').orderByChild("email").equalTo(email);//.orderByKey().limitToLast(100);
            itemRef.on('value', snapshot => {
                let items = snapshot.val();
                let newState = [];
                let name = [];
                let size

                // if there is no order
                if (snapshot.numChildren() === 0) {
                    this.setState({
                        message: "The basket is empty. Please login to add items into basket"
                    });
                }
                else {
                    //get all the data from the db
                        // console.log(element.val().name);

                    // snapshot.forEach(function(element, index)
                    // {
                    // name.push(element.val().name);
                    // console.log(typeof(index))

                    // });



                     
                    // console.log(name)

                 for (let item in items) {

                        console.log(snapshot.numChildren())
                        console.log(snapshot)

                     


                        newState.push(
                            {
                                id: item,
                                name: items[item].name,
                                price: items[item].price,
                                quantity: items[item].quantity,
                                total: items[item].price * items[item].quantity,
                                size: items[item].size

                            }
                        );
                    }//end for
                    // set the data
                    this.setState(
                        { items: newState });
                 }
             })
        }
        else {
            this.setState({
                message: "The basket is empty. Please login to add items into basket"
            });

        }
    }// end retrieve data from firebase









    render() {

        return (
            <div>
                <h1>{this.state.message}</h1>

                <div className="jumbotron">

                    <h1>Basket</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Size</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.size}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.total}</td>

                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                </div>








            </div>
        )
    }
}