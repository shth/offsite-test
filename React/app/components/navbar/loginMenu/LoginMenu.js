import React from 'react';

class LoginBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSubmenu: false
        }
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu() {
        const {openSubmenu} = this.state;
        this.setState({openSubmenu: !openSubmenu})
    }

    render() {
        const {openSubmenu} = this.state;
        const style = {
            menuPopup: {
                display: openSubmenu ? 'block' : 'none'
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
                                    <span></span>會員登入
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="menu__top__member menu__top_popup" style={style.menuPopup}>
                        <div className="menu__top__member_beforelogin">
                            <ul>
                                <li><a className="btn alreadymember" href="https://www.hk01.com/member/login">登入</a>
                                </li>
                                <li><a className="btn notyetmember" href="https://www.hk01.com/member/registration">註冊成為會員</a>
                                </li>
                            </ul>
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

export default LoginBar