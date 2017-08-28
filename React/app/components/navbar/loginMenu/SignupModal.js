import React from 'react'
import {dialogStyle} from '../../common/CustomModal';

class SignupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            email: '',
        }
    }

    render() {
        return (
            <div>
                <div style={dialogStyle}>
                    <h1>Sign up</h1>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                        <input type="text" value={this.state.email} onChange={this.onChange} name="email"/>
                    </div>
                </div>
            </div>
        )
    }
}
export default SignupModal