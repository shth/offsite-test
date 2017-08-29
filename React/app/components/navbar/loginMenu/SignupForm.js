import React from 'react'
import Form from 'muicss/lib/react/form'
import Button from 'muicss/lib/react/button'
import {connect} from 'react-redux';
import Validator from 'Validator'
import isEmpty from 'lodash/isEmpty'

import {registerUser} from '../../../actions/SessionActions';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
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
        const {email, password, confirmPassword} = this.state;
        if (!Validator.isEmail(email)) {
            error.email = "Invalid Email"
        }
        if (!Validator.isAlphanumeric(password) ) {
            error.password = "Password must not contain special characters"
        }
        if (Validator.isAlpha(password) || Validator.isNumeric(password)) {
            error.password = "Password must contain at least 1 letter and 1 number"
        }
        if (!Validator.isLength(password, {min: 6, max: 12})) {
            error.password = "Password must be between 6-12 characters"
        }
        if (!Validator.equals(password, confirmPassword)) {
            error.confirmPassword = "Passwords are not equal"
        }
        if (Validator.isEmpty(email)) {
            error.email = "This field is required."
        }
        if (Validator.isEmpty(password)) {
            error.password = "This field is required."
        }
        if (Validator.isEmpty(confirmPassword)) {
            error.confirmPassword = "This field is required."
        }

        return error;
    }

    submit() {
        this.props.registerUser(this.state)
            .then(() => {
                this.props.close();
            })
            .catch(error => {
                this.setState({error});
            });
    }

    render() {
        const {email, password, confirmPassword} = this.state
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
                <div>Sign up</div>
                <Form>
                    <div className="mui-textfield">
                        <input type="text" placeholder="Email" value={email} name="email" onChange={this.handleChange}
                               style={Object.assign({}, this.state.error.email && style.hasError)}/>
                        {this.state.error.email &&
                        <p className="mui--text-caption" style={style.errorMessage}>{this.state.error.email}</p>}
                    </div>
                    <div className="mui-textfield">
                        <input type="password" placeholder="Password" value={password} name="password"
                               onChange={this.handleChange}
                               style={Object.assign({}, this.state.error.password && style.hasError)}/>
                        {this.state.error.password &&
                        <p className="mui--text-caption" style={style.errorMessage}>{this.state.error.password}</p>}
                    </div>
                    <div className="mui-textfield">
                        <input type="password" placeholder="Confirm Password" value={confirmPassword}
                               name="confirmPassword" onChange={this.handleChange}
                               style={Object.assign({}, this.state.error.confirmPassword && style.hasError)}/>
                        {this.state.error.confirmPassword &&
                        <p className="mui--text-caption" style={style.errorMessage}>{this.state.error.confirmPassword}</p>}
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

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        authenticated: state.auth.authenticated
    }
}

// function mapActionsToProps(dispatch){
//     return {
//         actions: bindActionCreators(sessionActions,dispatch)
//     }
// }
export default connect(mapStateToProps, {registerUser})(SignupForm)