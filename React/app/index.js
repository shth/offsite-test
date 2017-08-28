import React from 'react';
import ReactDOM from 'react-dom';
import ViewListContainer from './components/viewList/ViewListContainer'
import Navbar from './components/navbar/Navbar'
import LoginContainer from './components/navbar/loginMenu/LoginContainer'

ReactDOM.render(<ViewListContainer />, document.getElementById('react_list_view_container'));
ReactDOM.render(<Navbar/>, document.getElementById('react_navbar'));
ReactDOM.render(<LoginContainer/>, document.getElementById('react_login'));