import React from 'react';
import ReactDOM from 'react-dom';
import ViewCover from './components/ViewCover'
import ViewList from './components/ViewList'

ReactDOM.render(<ViewCover />, document.getElementById('react_view_cover'));
ReactDOM.render(<ViewList />, document.getElementById('react_view_list'));