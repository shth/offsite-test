import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {registerUser} from '../../../actions/SessionActions';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        /* TODO: implement submit function */
        this.props.registerUser(this.state)
            .then(() => {
                this.props.close();
            });
    }

    render() {
        const {email, password, confirmPassword} = this.state
        return (
            <div>
                <div>Sign up</div>
                { this.props.authenticated && <div>you are already logged in</div>}
                <Form>
                    <Input hint="Email" value={email} name="email" onChange={this.handleChange}/>
                    <Input hint="Password" type="password" value={password} name="password"
                           onChange={this.handleChange}/>
                    <Input hint="Confirm Password" type="password" value={confirmPassword} name="confirmPassword"
                           onChange={this.handleChange}/>
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