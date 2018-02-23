import React from 'react';
import ReactDOM from 'react-dom';
import { SlideToggle } from 'react-slide-toggle';
require('../scss/main.scss');
const carrot = require('../images/carrot.png');
const onion = require('../images/onion.png');
const tomato = require('../images/tomato.png');
const potato = require('../images/potato.png');
const milk = require('../images/milk.png');
const yogurt = require('../images/yogurt.png');
const cheese = require('../images/cheese.png');
const eggs = require('../images/eggs.png');
const apple = require('../images/apple.png');
const pear = require('../images/pear.png');
const orange = require('../images/orange.png');
const banana = require('../images/banana.png');
const pork = require('../images/pork.png');
const chicken = require('../images/chicken.png');
const beef = require('../images/beef.png');
const fish = require('../images/fish.png');
const flour = require('../images/flour3.png');
const rice = require('../images/rice2.png');
const pasta = require('../images/pasta.png');
const bread = require('../images/bread.png');
const watermelon = require('../images/fruits-watermelon.gif');

class Header extends React.Component {
    render(){
     return (
         <header className="page-header">
             <div className="container">
                 <span className="page-header__logo">Never empty fridge
                 </span>
             </div>
         </header>
     )
   }
 }

class RecipesFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            vegetables: [{name: "carrot", img: carrot, category: "vege"}, {name: "onion", img: onion, category: "vege" }, {name: "potato", img: potato, category: "vege"}, {name: "tomato", img: tomato, category: "vege"}],

            fruits: [{name: "apple", img: apple, category: "fruits"}, {name: "pear", img: pear, category: "fruits"}, {name: "orange", img: orange, category: "fruits"}, {name: "banana", img: banana, category: "fruits"} ],

            dairy: [{name: "milk", img: milk, category: "dairy"}, {name: "yogurt", img: yogurt, category: "dairy"}, {name: "cheese", img: cheese, category: "dairy"}, {name: "eggs", img: eggs, category: "dairy"} ],

            meats: [{name: "pork", img: pork, category: "meats"}, {name: "beef", img: beef, category: "meats"}, {name: "chicken", img: chicken, category: "meats"}, {name: "fish", img: fish, category: "meats"} ],

            grains: [{name: "flour", img: flour, category: "grains"}, {name: "rice", img: rice, category: "grains"}, {name: "pasta", img: pasta, category: "grains"}, {name: "bread", img: bread, category: "grains"} ],

            chosen: [],
            label: "",
            img: "",
            error: '',
            count: 0,
            url: "",
            pending: false,
        }
    }


    selectIngr=(e)=>{
        let select = e.currentTarget.dataset.name;
        let selectCategory = e.currentTarget.dataset.category;
        let img = e.currentTarget.querySelector('img').getAttribute('src');
        this.setState({
            vegetables: this.state.vegetables.filter((e) =>  e.name !== select),
            fruits: this.state.fruits.filter((e) =>  e.name !== select),
            dairy: this.state.dairy.filter((e) =>  e.name !== select),
            meats: this.state.meats.filter((e) =>  e.name !== select),
            grains: this.state.grains.filter((e) =>  e.name !== select),
            chosen: [...this.state.chosen, {name: select, img: img, category: selectCategory}],
        });
    };

    removeIngr=(e)=>{
        let select = e.currentTarget.dataset.name;
        let selectCategory = e.currentTarget.dataset.category;
        let img = e.currentTarget.querySelector('img').getAttribute('src');
        this.setState({
            chosen: this.state.chosen.filter((e) => e.name !== select)});
        if (selectCategory==="vege"){
            this.setState({
                vegetables: [...this.state.vegetables, {name: select, img: img, category: selectCategory}]
            });
        }
        if (selectCategory==="fruits"){
            this.setState({
                fruits: [...this.state.fruits, {name: select, img: img, category: selectCategory}]
            });
        }
        if (selectCategory==="dairy"){
            this.setState({
                dairy: [...this.state.dairy, {name: select, img: img, category: selectCategory}],
            });
        }
        if (selectCategory==="meats"){
            this.setState({
                meats: [...this.state.meats, {name: select, img: img, category: selectCategory}],
            });
        }
        if (selectCategory==="grains"){
            this.setState({
                grains: [...this.state.grains, {name: select, img: img, category: selectCategory}]
            });
        }
    };


    getRecipe=(e)=> {
        let query = '';
        this.state.chosen.forEach((e) => {
            query+=e.name + ','
        });
        this.setState({
            pending: true,
        });

        fetch(`https://api.edamam.com/search?q=${query}&app_id=d6057d60&app_key=1a924c59cc7e6bb909081cb2bfaca895&from=0&to=100`)
            .then(r => r.json())
            .then(r => {
                console.log(r);
                this.setState({
                    error: ''
                });
                let index = 0;
                r.count < 100 ? index = Math.floor(Math.random() * r.count) : index = Math.floor(Math.random() * 100);
                console.log(index);
                this.setState({
                    pending: false,
                    label: r.hits[index].recipe.label,
                    img: r.hits[index].recipe.image,
                    url: r.hits[index].recipe.url
                })
            }).catch(r => {
                this.setState({
                error: 'Błąd'
            });
        });
        e.currentTarget.parentElement.parentElement.classList.toggle("flipped");
    };

    getAnotherRecipe=(e)=> {
        let query = '';
        this.state.chosen.forEach((e) => {
            query+=e.name + ','
        });
        this.setState({
            pending: true,
        });


        fetch(`https://api.edamam.com/search?q=${query}&app_id=d6057d60&app_key=1a924c59cc7e6bb909081cb2bfaca895&from=0&to=100`)
            .then(r => r.json())
            .then(r => {
                console.log(r);
                let index = 0;
                r.count < 100 ? index = Math.floor(Math.random() * r.count) : index = Math.floor(Math.random() * 100);
                console.log(index);
                this.setState({
                    pending: false,
                    label: r.hits[index].recipe.label,
                    img: r.hits[index].recipe.image,
                    url: r.hits[index].recipe.url,
                })
            }).catch(r => {
            this.setState({
                error: 'Błąd'
            });
        });
    };



    dropDownList=(e)=> {


        e.currentTarget.parentElement.parentElement.querySelectorAll('.eats').forEach((el,i) => {
            if(el !== e.currentTarget.nextElementSibling){
                el.classList.add('hide');
            }
        });

        e.currentTarget.nextElementSibling.classList.toggle('hide');



    };

    flip = (e)=> {
        e.currentTarget.parentElement.parentElement.parentElement.classList.toggle("flipped");
        console.log(e.currentTarget.parentElement.parentElement);
    };


    render(){
        let vege = this.state.vegetables.map( (e,i) => {
            return <li onClick={this.selectIngr} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
        });
        let dairy = this.state.dairy.map( (e,i) => {
            return <li onClick={this.selectIngr} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
        });
        let fruits = this.state.fruits.map( (e,i) => {
            return <li onClick={this.selectIngr} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
        });
        let meats = this.state.meats.map( (e,i) => {
            return <li onClick={this.selectIngr} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
        });
        let grains = this.state.grains.map( (e,i) => {
            return <li onClick={this.selectIngr} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
        });

        let chosen = this.state.chosen.map((e,i) => {
            return (
                <li onClick={this.removeIngr} key={i} data-name={e.name} data-category={e.category}>{i+1}.  <img src={e.img}/>  {e.name}</li>
            )
        });

        let result = <div/>;
        let pending = <img />;
        if (this.state.error) {
            result = <div className="error">Sorry we couldn't find any matches for your ingredients. Please try searching with another products.</div>;
            document.querySelector(".new-recipe-btn").classList.add('hide');
        }
        else {
            if (this.state.pending){
                 pending = <img className="pending" src={watermelon}/>

            }
            else {
                result = <div className="new-recipe"><h1>{this.state.label}</h1><a href={this.state.url} target="_blank"><img src={this.state.img}/></a></div>
            }


        }
        console.log(this.state.error);
        console.log(this.state.url);

        return (
            <section className="application">
                <div className="container">
                    <div className="application__box">
                        <div className="fridge">
                            <div className="food_categories">
                                <span>Choose your ingredients</span>
                                <div onClick={this.dropDownList} className="drop_down_list">
                                    <span className="list_label">Vegetables</span>
                                    <span  className="list_arrow"/>
                                </div>
                                <ul className="eats vege hide">{vege}</ul>
                                <div onClick={this.dropDownList} className="drop_down_list">
                                    <span className="list_label">Fruits</span>
                                    <span className="list_arrow"/>
                                </div>
                                <ul className="eats fruits hide">{fruits}</ul>
                                <div onClick={this.dropDownList} className="drop_down_list">
                                    <span className="list_label">Dairy</span>
                                    <span className="list_arrow"/>
                                </div>
                                <ul className="eats dairy hide">{dairy}</ul>
                                <div onClick={this.dropDownList} className="drop_down_list">
                                    <span className="list_label">Meats</span>
                                    <span  className="list_arrow"/>
                                </div>
                                <ul className="eats meats hide">{meats}</ul>
                                <div onClick={this.dropDownList} className="drop_down_list">
                                    <span className="list_label">Baking & Grains</span>
                                    <span className="list_arrow"/>
                                </div>
                                <ul className="eats grains hide">{grains}</ul>
                            </div>
                        </div>
                        <div className="chosen-products">
                            <div className="clip">
                                <div className="clip-one" />
                                <div className="clip-two" />
                            </div>
                            <section className="perspective">
                                <div id="card">
                                    <figure className="front">
                                        <h1 className="chosen-poroducts__title">Chosen ingredients</h1>
                                        <ul className="chosen-poroducts__list">{chosen}</ul>
                                        <button className="get-recipe-btn" onClick={this.getRecipe}>Get recipe</button>
                                    </figure>
                                    <figure className="back">
                                        <div className="new-recipe__box">{pending}{result}</div>
                                        <div className="btn-box">
                                            <button className="new-recipe-btn" onClick={this.getAnotherRecipe}>Next recipe</button>
                                            <button className="new-recipe-btn" onClick={this.flip} id="flip">Go back to your ingredient list</button>
                                        </div>
                                    </figure>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class Footer extends React.Component {
    render(){
     return (
         <footer>
             <div className="container">
                 <span className="footer__logo">Never empty fridge</span>
             </div>
         </footer>

     )
   }
 }

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



