import '../css/bootstrap.min.css';
import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import $ from 'jquery';
import {Header, Footer} from './components/includes';
import Home from './components/home';
import Blog from './components/blog';
import Article from './components/article';
import Market from './components/market';
import {Login, Reset, NewBlog, Subscribers, Bend_Blogs} from './components/backend';
import CustomizedSnackbars from './components/includes/snatchbar';


export default class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Router>
                <div>

                <div id="fb-root"></div>
                <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=674756889610644&autoLogAppEvents=1"></script>
                
                
                <Route path="/" component={({location})=>{
                    return (!location.pathname.includes("/trash")) ?
                        <Header/> :
                        ''
                }}/>                
                <Route exact path="/" component={Home} />
                <Route exact path="/blog" component={Blog} />
                <Route path="/blog/:id" component={Article} />
                <Route path="/market" component={Market} />
                <Route path="/trash" component={
                    (props)=>{
                        if(true){
                            const avoid = ["/trash", "/trash/reset"];
                            const real = ['/trash/new', '/trash', '/trash/sub'];
                            return <div>
                                {<Route path="/" component={({location})=>{
                                    return ($.inArray(location.pathname, real) != -1) ?
                                        <Header/>: '';
                                }}/>}
                                <Route exact path="/trash" component={Bend_Blogs}/>
                                <Route path="/trash/login" component={Login}/>
                                <Route path="/trash/reset" component={Reset}/>
                                <Route path="/trash/new" component={NewBlog}/>
                                <Route path="/trash/edit" component={NewBlog}/>
                                <Route path="/trash/sub" component={Subscribers}/> 
                                <Route path="/" component={({location})=>{
                                    return ($.inArray(location.pathname, real) != -1) ?
                                        <Footer/> :
                                        ''
                                }}/>
                            </div>
                        }else{
                            return <Login {...props} />
                        }
                    }
                }/>
                <Route path="/" component={({location})=>{
                    return (!location.pathname.includes("/trash")) ?
                        <Footer/> :
                        ''
                }}/>
                <CustomizedSnackbars/>
                </div>
            </Router>
        )
    }
}
