import React from 'react';
import ReactDOM from 'react-dom';
import { SlideToggle } from 'react-slide-toggle';
require('../scss/main.scss');

import Header from './header.jsx';
import Footer from './footer.jsx';
import RecipesFinder from "./recipe_finder.jsx";


class App extends React.Component {
    render(){
        return(
            <div>
                <Header />
                <RecipesFinder/>
                <Footer />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});



