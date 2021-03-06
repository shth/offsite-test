import React from 'react';
import ReactModal from 'react-modal'
import {connect} from 'react-redux'

import {logoutUser} from '../../../actions/SessionActions';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

class LoginBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSubmenu: false,
            openLoginModal: false,
            openSignupModal: false,
        }
        this.toggleMenu = this.toggleMenu.bind(this)
        this.openSignupModal = this.openSignupModal.bind(this)
        this.closeSignupModal = this.closeSignupModal.bind(this)
        this.openLoginModal = this.openLoginModal.bind(this)
        this.closeLoginModal = this.closeLoginModal.bind(this)
    }

    toggleMenu() {
        const {openSubmenu} = this.state;
        this.setState({openSubmenu: !openSubmenu})
    }

    openLoginModal() {
        this.setState({openLoginModal: true});
    }

    openSignupModal() {
        this.setState({openSignupModal: true});
    }

    closeLoginModal() {
        this.setState({openLoginModal: false});
    }

    closeSignupModal() {
        this.setState({openSignupModal: false});
    }

    render() {
        const {openSubmenu} = this.state;
        const style = {
            menuPopup: {
                display: openSubmenu ? 'block' : 'none'
            },
            modal: {
                overlay: {
                    zIndex: 1045,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    width: 400,
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                }
            }
        }
        return (
            <div className="menu__top">
                <div className="wrapper">
                    <div className="container">
                        <a id="popup_datetime">
                            <div className="weather" style={{cursor: 'default'}}>
                                <span className="date">2017.1.29&nbsp;&nbsp;10:00</span>
                                <span className="week">&nbsp;星期日&nbsp;&nbsp;</span>
                                <span className="temp">&nbsp;19°C</span>
                            </div>
                        </a>
                        <div className="container float_right">
                            <a id="popup_search">
                                <div className="search"><span></span></div>
                            </a>
                            <a id="popup_member" onClick={this.toggleMenu}>
                                <div className="member_btn">
                                    <span><img src="/images/avatar-sm.png" style={{width: 20, marginTop: 4}}/></span>{this.props.authenticated ? '你好' : '會員登入'}
                                </div>
                            </a>
                        </div>
                    </div>
                    <ReactModal isOpen={this.state.openSignupModal} onRequestClose={this.closeSignupModal}
                                style={style.modal}>
                        <SignupForm close={this.closeSignupModal}/>
                    </ReactModal>
                    <ReactModal isOpen={this.state.openLoginModal} onRequestClose={this.closeLoginModal}
                                style={style.modal}>
                        <LoginForm close={this.closeLoginModal}/>
                    </ReactModal>
                    <div className="menu__top__member menu__top_popup" style={style.menuPopup}>
                        <div className="menu__top__member_beforelogin">
                            {this.props.authenticated
                                ? <div style={{color: 'black'}}>
                                    <div>
                                        <img src="/images/avatar.png" style={{width: 100}}/>
                                        <p>{this.props.user.email}</p>
                                    </div>
                                    <button onClick={this.props.logoutUser}>Logout</button>
                                </div>
                                : <ul>
                                    <li><a className="btn alreadymember" href="#!"
                                           onClick={this.openLoginModal}>登入</a>
                                    </li>
                                    <li><a className="btn notyetmember" href="#!"
                                           onClick={this.openSignupModal}>註冊成為會員</a>
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>


                    <div className="menu__top__search menu__top_popup" data-search-form="" style={{right: '53px'}}>
                        <input type="search" name="keyword" placeholder="搜尋"/>
                        <div className="btn">搜尋</div>
                    </div>

                </div>
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
export default connect(mapStateToProps, {logoutUser})(LoginBar)