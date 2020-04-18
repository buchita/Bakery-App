import React, { Component } from 'react';
import Firebase from '../Firebase/firebase';

// import { FaUser } from 'react-icons/fa';




export default class UserRegistration extends Component {
    constructor(props) {
        super(props);
        // set up react state
        this.state = {
            inputusername: '',
            inputemail: '',
            inputpass1: '',
            inputpass2: '',
        };

        //binding
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }


    handleSubmit(e) {
        e.preventDefault(); // prevent form submit from reloading the page

        const { inputpass1, inputpass2 } = this.state;
        // perform all neccassary validations
        if (inputpass1 !== inputpass2) {
            alert("Passwords don't match");
        } else {
            //db
            const itemRef = Firebase.database().ref('user');

            const item =
            {
                username: this.state.inputusername,
                email: this.state.inputemail,
                password: this.state.inputpass1
            }

            /* Send the message to Firebase */
            itemRef.push(item);

            // clear the input
            this.setState(
                {
                    inputusername: '',
                    inputemail: '',
                    inputpass1: '',
                    inputpass2: ''
                }
            )
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        });
    }

    componentWillMount(){
        const isLoggedin = localStorage.getItem('isLoggedin') === 'true';

        //if logged in
        if( isLoggedin )
        {
            this.props.history.push('/account');
            // const user = isLoggedin ? localStorage.getItem('username') : '';
            // this.setState({ user, isLoggedin });
        }
       
    }


    render() {
        return (

            <div id="box" className="container">
                <h1>User SignUp</h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    {/* username */}
                    <div className="row">
                        <div className="col-sm-2">
                            <label>Username: </label>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" name="inputusername" 
                            placeholder="Username" onChange={this.handleChange}
                            value={this.state.inputusername} required />
                        </div>
                    </div>

                    <br />
                    <div className="row">
                        <div className="col-sm-2">
                            <label>Email: </label>
                        </div>
                        <div className="col">
                            <input type="email" className="form-control" name="inputemail" 
                            placeholder="Email Address" onChange={this.handleChange}
                            value={this.state.inputemail} required />
                        </div>
                    </div>


                    <br />
                    <div className="row">
                        <div className="col-sm-2">
                            <label>Password: </label>
                        </div>
                        <div className="col">
                            <input type="password" className="form-control" name="inputpass1" 
                            placeholder="Password" onChange={this.handleChange}
                            value={this.state.inputpass1} required />
                        </div>
                    </div>

                    <br />
                    <div className="row">
                        <div className="col-sm-2">
                            <label>Confirm Password: </label>
                        </div>
                        <div className="col">
                            <input type="password" className="form-control" name="inputpass2"
                            placeholder="Confirm Password" onChange={this.handleChange}
                            value={this.state.inputpass2} required />
                        </div>
                    </div>

                    {/* link to login page */}
                    <a href="/login">Already have an account</a>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    
                </form>

            </div>


        )
    }
}