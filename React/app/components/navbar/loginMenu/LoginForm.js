import React from 'react'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import {connect} from 'react-redux';
import Validator from 'Validator'
import isEmpty from 'lodash/isEmpty'

import {logInUser} from '../../../actions/SessionActions';


class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        let error = this.validate();
        if (isEmpty(error)) {
            this.submit();
        }
        else {
            this.setState({error});
        }

    }

    validate() {
        let error = {};
        const {email, password} = this.state;
        if (Validator.isEmpty(email)) {
            error.email = "This field is required."
        }
        if (Validator.isEmpty(password)) {
            error.password = "This field is required."
        }

        return error;
    }

    submit() {
        this.props.logInUser({
            email: this.state.email,
            password: this.state.password
        })
            .then(() => {
                this.props.close();
            })
            .catch(error => {
                this.setState({error});
            });
    }


    render() {
        const {email, password} = this.state
        const style = {
            hasError: {
                borderColor: "#F44336",
                borderWidth: 2,
                height: 33,
                marginBottom: -1
            },
            errorMessage: {
                color: '#F44336'
                , marginTop: 2
            }
        }
        return (
            <div>
                <div>Log In</div>
                <Form>
                    <div className="mui-textfield">
                        <input type="text" placeholder="Email" value={email} name="email" onChange={this.handleChange}
                               style={Object.assign({}, this.state.error.email && style.hasError)} ref="email"/>
                        {this.state.error.email &&
                        <p className="mui--text-caption" style={style.errorMessage}>{this.state.error.email}</p>}
                    </div>
                    <div className="mui-textfield">
                        <input type="password" placeholder="Password" value={password} name="password"
                               onChange={this.handleChange}
                               style={Object.assign({}, this.state.error.password && style.hasError)} ref="password"/>
                        {this.state.error.password &&
                        <p className="mui--text-caption" style={style.errorMessage}>{this.state.error.password}</p>}
                    </div>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        this.props.close()
                    }}>Close</Button>
                </Form>
            </div>
        )
    }
}
export default connect(null, {logInUser})(LoginModal)