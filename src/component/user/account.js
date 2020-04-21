import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Firebase from '../Firebase/firebase';



export default class UserAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            items: [],
        };

    }

    componentWillMount() {
        const isLoggedin = localStorage.getItem('isLoggedin') === 'true';

        //if logged in
        if (isLoggedin) {
            //this.props.history.push('/login');
            const username = isLoggedin ? localStorage.getItem('username') : '';
            const email = isLoggedin ? localStorage.getItem('email') : '';
            const password = isLoggedin ? localStorage.getItem('password') : '';
            let newState = [];
            let encryptedpass = [];

            // encrypt the password to displat as *
            for (let i = 0; i < password.length; i++) {
                encryptedpass.push('*');
            }

            newState.push(
                {
                    username: username,
                    email: email,
                    password: encryptedpass

                }
            );


            let itemRef = Firebase.database().ref('order').orderByChild("email").equalTo(email);//.orderByKey().limitToLast(100);
            itemRef.on('value', snapshot => {
                let items = snapshot.val();
                let paiditem = [];


                for (let item in items) {

                    console.log(item)

                    // if have paid 
                    if (items[item].pay === true) {
                        paiditem.push(
                            {
                                id: item,
                                name: items[item].name,
                                price: items[item].price,
                                quantity: items[item].quantity,
                                total: items[item].price * items[item].quantity,
                                size: items[item].size,
                                pay: items[item].pay,
                                time: items[item].date

                            }
                        );
                    }



                }//end for
                // set the state with data
                this.setState({
                    items: paiditem
                })
            })


            this.setState({
                data: newState
            })


        }


    }

    Logout(e) {
        localStorage.clear();
        // history.push("/login");
        // history.replace("/login")
        // location.href = "/login"   
    }




    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">


                        {/* https://getbootstrap.com/docs/4.0/components/scrollspy/#list-item-2 */}
                        <div id="tabs" className="list-group" role="tablist">
                            <a className="list-group-item list-group-item-action" href="#personal" >Personal</a>
                            <a className="list-group-item list-group-item-action" href="#order">Order History</a>
                            {/* <a className="list-group-item list-group-item-action" href="#order1">Item 3</a> */}
                        </div>
                    </div>

                    <div className="col-sm-9" data-spy="scroll" data-target="#tabs" data-offset="0">

                        <div id="personal" className="jumbotron">
                            {this.state.data.map((d) => {
                                return (
                                    <div className="container">

                                        <h2 >Account Information</h2>
                                        <h5>Username: {d.username}</h5>
                                        <h5>Email: {d.email}</h5>
                                        <h5>password: {d.password}</h5>

                                        <p>Still need to do the redirecting</p>
                                        <button onClick={this.Logout}>Logout</button>
                                    </div>

                                );
                            })}

                        </div> {/* end personal */}


                        <div id="order" className="jumbotron">

                            <h1>Order History</h1>

                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Time</th>
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
                                                <td>{item.time}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>

                        </div>















                    </div>{/* col-sm-9 */}







                </div>
            </div>
        )
    }


}
