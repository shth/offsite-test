// import React from 'react';
// import ReactDOM from 'react-dom';
// import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
// import {Row, Col} from 'react-bootstrap';
//
// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     componentDidMount() {
//         fetch('https://api.github.com/gists')
//             .then(response => response.json())
//             .then(data => {
//                 this.setState({gists: data})
//             })
//     }
//
//     render() {
//         const {gists} = this.state
//         return (
//             <Router>
//                 <Row>
//                     <Col xs={3}>
//                         <SideBar list={gists}/>
//                     </Col>
//                     <Col xs={9}>
//                         <div>
//                             <Route exact path='/' render={() => (
//                                 <h1>Home</h1>
//                             )}/>
//                             <Route path='/g/:description' render={({match}) => (
//                                 <Gist
//                                     gist={this.state.gists.find(item => item.description === match.params.description)}/>
//                             )}/>
//                         </div>
//                     </Col>
//                 </Row>
//             </Router>
//         );
//     }
// }
//
// const SideBar = (props) => {
//     const style = {
//         height: '100%'
//         , color: 'white'
//         , backgroundColor: '#f8f8f8'
//     }
//     const {list} = props
//     return (
//         <div style={style}>
//             { list ? list.map(item => <SideBarItem key={item.id} item={item}/>) : 'Loading...'}
//         </div>
//     )
// }
//
// const SideBarItem = (props) => {
//     const style = {}
//     const {item} = props
//     return (
//         <Link to={`/g/${item.description}`}>
//             <div style={style}>{item.description}</div>
//         </Link>
//     )
// }
//
// class Gist extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//
//     componentDidMount() {
//         this.fetchGist(this.props.gist);
//     }
//
//     componentWillReceiveProps(nextProps) {
//         if (!this.props.gist) return;
//         if (this.props.gist.id === nextProps.gist.id) return;
//         this.fetchGist(nextProps.gist);
//     }
//
//     fetchGist(gist) {
//         if (!gist) return;
//         const url = Object.keys(gist.files).reduce((result, key) => {
//             if (!result) return gist.files[key].raw_url
//         }, '');
//         fetch(url)
//             .then(response => response.text())
//             .then(gistContent => this.setState({gistContent}))
//     }
//
//     render() {
//         const style = {};
//         const {gistContent} = this.state;
//         const gist = this.props.gist;
//         const {created_at, description, files, updated_at} = gist;
//         const fields = {created_at, description};
//         return (
//             <div style={style}>
//                 { fields ? Object.keys(fields).map(key => (
//                     typeof this.props.gist[key] === 'object'
//                         ? (
//                         <div key={key}>
//                             <label>{key}</label>
//                             <p>{key}: Object</p>
//                         </div>
//                     )
//                         : (
//                         <div key={key}>
//                             <label>{key}</label>
//                             <p key={key}>{key}: {gist[key]}</p>
//                         </div>
//                     )
//                 )) : 'loading'}
//                 <pre>{gistContent ? gistContent : 'loading gist...'}</pre>
//             </div>
//         )
//     }
// }
// ReactDOM.render(<App />, document.getElementById('app'));
alert('hi from webpack');