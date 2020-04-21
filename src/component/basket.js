import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Firebase from './Firebase/firebase';
import Modal from 'react-modal';
// import { FaTrashAlt } from 'react-icons/fa';


export default class Basket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            items: [],
            modalIsOpen: false,
            updateData: [],
            selectedValue: '',
            selectedCheck: false,
            selectedSize: '',
            sizeCheck: false,

        };
        this.openModal = this.openModal.bind(this);
        this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.change = this.change.bind(this);
        this.payment = this.payment.bind(this);


    }



    componentWillMount() {
        // modal setup
        Modal.setAppElement('body');
        const isLoggedin = localStorage.getItem('isLoggedin') === 'true';

        if (isLoggedin) {

            const email = isLoggedin ? localStorage.getItem('email') : '';

            /* Create reference to messages in Firebase Database */
            let itemRef = Firebase.database().ref('order').orderByChild("email").equalTo(email);//.orderByKey().limitToLast(100);
            itemRef.on('value', snapshot => {
                let items = snapshot.val();
                let newState = [];


                // if there is no order
                if (snapshot.numChildren() === 0) {
                    this.setState({
                        message: "The basket is empty. Please login to add items into basket"
                    });
                }
                else {
                    //get all the data from the db


                    // snapshot.forEach(function(element, index)
                    // {
                    // name.push(element.val().name);
                    // console.log(typeof(index))
                    // console.log(element.val().name);

                    // });



                    console.log(snapshot.numChildren())

                    for (let item in items) {

                        console.log(item)

                        // if havent paid yet
                        if (items[item].pay === false) {
                            newState.push(
                                {
                                    id: item,
                                    name: items[item].name,
                                    price: items[item].price,
                                    quantity: items[item].quantity,
                                    total: items[item].price * items[item].quantity,
                                    size: items[item].size,
                                    pay: items[item].pay

                                }
                            );
                        }



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


    // https://www.npmjs.com/package/react-modal
    openModal(e) {
        let itemId = e.target.value;

        let itemRef = Firebase.database().ref('order');//.orderByKey().limitToLast(100);
        itemRef.on('value', snapshot => {
            let items = snapshot.val();
            let newState = [];


            for (let item in items) {
                if (item === itemId) {
                    console.log("the same");
                    console.log(itemId);
                    console.log(item);
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
                    // set the data
                    this.setState(
                        { updateData: newState });
                }

            }

        });

        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleModalCloseRequest = () => {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({ modalIsOpen: false });
    }

    // update Data
    handleSaveClicked = (e) => {
        // alert('Save button was clicked');
        let itemId = e.target.value;
        console.log(itemId)

        let selectedQuantity = this.state.selectedValue;
        let selectedSize = this.state.selectedSize;
        let price = 0;
        const itemRef = Firebase.database().ref(`/order/${itemId}`);

        if (this.state.selectedCheck) {
            itemRef.update({ 'quantity': selectedQuantity });
            this.handleModalCloseRequest();

        }
        if (this.state.sizeCheck) {
            itemRef.update({ 'size': selectedSize });
            console.log(selectedSize);


            if (selectedSize === "S") {
                price = 10.99;
            }
            else if (selectedSize === "M") {
                price = 12.99;
            }
            else if (selectedSize === "L") {
                price = 14.99;
            }
            else {
                console.log("this is in the else in basket");
            }
            itemRef.update({ 'price': price });

            this.handleModalCloseRequest();
        }

        // if nothing is changed returns back to basket
        this.handleModalCloseRequest();

    }


    handleDeleteClicked(e) {
        console.log(e.target.value)
        let itemId = e.target.value;

        // confirm for deletion
        const r = window.confirm("Are you sure you want to delete this?");
        if (r === true) {
            // remove item from db
            const itemRef = Firebase.database().ref(`/order/${itemId}`);
            itemRef.remove();
            this.handleModalCloseRequest();
        }


    }
    handleChange(e) {
        this.setState({
            selectedValue: e.target.value,
            selectedCheck: true
        });

    }
    change(e) {
        this.setState({
            selectedSize: e.target.value,
            sizeCheck: true
        });

    }
    payment(e) {
        let data = this.state.items;
        console.log(data)

        // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
        let today = new Date().toISOString().slice(0, 10);
        console.log(today)
        
        for (let d in data) {
            let itemId = data[d].id;
            let itemRef = Firebase.database().ref(`/order/${itemId}`);
            itemRef.update({ 
                'pay': true ,
                'date': today
            });
        }

        alert("You have placed the order");

    }




    render() {
        const selectedCheck = this.state.selectedCheck;
        const sizeCheck = this.state.sizeCheck;
        // let lenMessage = this.state.message.length;
        // if(lenMessage !== 0)
        // {
        //     lenMessage = true;
        // }
        // else
        // {
        //     lenMessage = false;
        // }
        return (
            <div>
                {/* <h1>{lenMessage ? this.state.message : ''}</h1> */}
                <h1>{this.state.message}</h1>
                <div className="jumbotron">

                    <h1>Basket</h1>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Size</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
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

                                        <td>
                                            {/* https://github.com/reactjs/react-modal/blob/master/examples/bootstrap/app.js */}
                                            <button type="button" className="btn btn-primary" onClick={this.openModal} value={item.id}>Change</button>
                                            <Modal
                                                className="Modal__Bootstrap modal-dialog"
                                                closeTimeoutMS={150}
                                                isOpen={this.state.modalIsOpen}
                                                onRequestClose={this.handleModalCloseRequest}
                                            >
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h4 className="modal-title">Update</h4>
                                                        <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                                                            <span aria-hidden="true">&times;</span>
                                                            <span className="sr-only">Close</span>
                                                        </button>
                                                    </div>
                                                    {this.state.updateData.map((data) => {
                                                        return (
                                                            <div>
                                                                <div className="modal-body">

                                                                    <h4>{data.name} - {sizeCheck ? this.state.selectedSize : data.size}</h4>
                                                                    <h4>Detail: {selectedCheck ? this.state.selectedValue : data.quantity}</h4>

                                                                    <select required className="custom-select"
                                                                        onChange={this.change}
                                                                        value={this.state.selectedSize}  >
                                                                        <option value="" disabled >Size</option>
                                                                        <option value="S">Small</option>
                                                                        <option value="M">Medium</option>
                                                                        <option value="L">Large</option>

                                                                    </select>

                                                                    <select required className="custom-select"
                                                                        onChange={this.handleChange}
                                                                        value={this.state.selectedValue}  >
                                                                        <option value="" disabled >Quantity</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>


                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" onClick={this.handleModalCloseRequest}>Close</button>
                                                                    <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked} value={data.id}>Save changes</button>

                                                                </div>
                                                            </div>

                                                        )
                                                    })}


                                                </div>
                                            </Modal>
                                        </td>
                                        {/* < FaTrashAlt /> */}
                                        <td><button type="button" className="btn btn-primary" onClick={this.handleDeleteClicked} value={item.id}>Remove</button></td>


                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                    <br />

                    <button id="paybtn" type="button" className="btn btn-primary btn-lg btn-block" onClick={this.payment} >Pay</button>







                </div>








            </div >
        )
    }
}