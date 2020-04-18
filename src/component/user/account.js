import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";



export default class UserAccount extends Component {

    constructor(props) {
        super(props);

        this.state = { data: [] };

    }

    componentWillMount() {
        const isLoggedin = localStorage.getItem('isLoggedin') === 'true';

        //if logged in
        if (isLoggedin) {
            //this.props.history.push('/login');
            const username = isLoggedin ? localStorage.getItem('username') : '';
            const email = isLoggedin ? localStorage.getItem('email') : '';
            const password = isLoggedin ? localStorage.getItem('password') : '';

            let encryptedpass = [];

            // encrypt the password to displat as *
            for( let i = 0; i< password.length; i++)
            {
                encryptedpass.push('*');
            }

            let newState = [];

            newState.push(
                {
                    username: username,
                    email: email,
                    password: encryptedpass

                }
            );

            // set the state with data
            this.setState({ data: newState });


        }

    }

    Logout(e)
    {
        localStorage.clear();
        // history.push("/login");
        // history.replace("/login")
        // location.href = "/login"   
    }


    render() {
    
        return (
            <div className="container">
                
                <div className="jumbotron">
                    {this.state.data.map((d) => {
                        return (
                            <div className="container">

                                <h2>Account Information</h2>
                                <h5>Username: {d.username}</h5>
                                <h5>Email: {d.email}</h5>
                                <h5>password: {d.password}</h5>

                                <p>Still need to do the redirecting</p>
                                <button onClick={this.Logout}>Logout</button>
                            </div>

                        );
                    })}

                </div>

            </div>
        )
    }


}
