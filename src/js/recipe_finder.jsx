import React from "react";
import { watermelon} from "./images";
import {vegetables, fruits, dairy, meats, grains} from "./food_categories" ;


class ListLabel extends React.Component {
    render(){
     return (
         <div onClick={this.props.onClick} className="list_label__box">
             <span className="list_label">{this.props.category}</span>
             <span  className="list_arrow"/>
         </div>
     )
   }
 }

export default class RecipesFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            vegetables: vegetables,
            fruits: fruits,
            dairy: dairy,
            meats: meats,
            grains: grains,

            chosen: [],
            label: "",
            img: "",
            error: "",
            count: 0,
            url: "",
            pending: false,
        }
    }


    selectIngredient =(e) => {
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
        let selectName = e.currentTarget.dataset.name;
        let selectCategory = e.currentTarget.dataset.category;
        let selectImg = e.currentTarget.querySelector('img').getAttribute('src');

        this.setState({
            chosen: this.state.chosen.filter((e) => e.name !== selectName)});

        switch (selectCategory){
            case "vege":
                this.setState({
                    vegetables: [...this.state.vegetables, {name: selectName, img: selectImg, category: selectCategory}]
                });
                break;

            case "fruits":
                this.setState({
                fruits: [...this.state.fruits, {name: selectName, img: selectImg, category: selectCategory}]
                });
                break;

            case "dairy":
                this.setState({
                    dairy: [...this.state.dairy, {name: selectName, img: selectImg, category: selectCategory}],
                });
                break;

            case "meats":
                this.setState({
                    meats: [...this.state.meats, {name: selectName, img: selectImg, category: selectCategory}],
                });
                break;

            case "grains":
                this.setState({
                    grains: [...this.state.grains, {name: selectName, img: selectImg, category: selectCategory}],
                });
                break;

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
                this.setState({
                    error: ''
                });
                let index = 0;
                r.count < 100 ? index = Math.floor(Math.random() * r.count) : index = Math.floor(Math.random() * 100);
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
                let index = 0;
                r.count < 100 ? index = Math.floor(Math.random() * r.count) : index = Math.floor(Math.random() * 100);
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
    };


    render(){
        let vege = this.state.vegetables.map( (e,i) => {
            return <li onClick={this.selectIngredient} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
        });
        let dairy = this.state.dairy.map( (e,i) => {
            return <li onClick={this.selectIngredient} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
        });
        let fruits = this.state.fruits.map( (e,i) => {
            return <li onClick={this.selectIngredient} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
        });
        let meats = this.state.meats.map( (e,i) => {
            return <li onClick={this.selectIngredient} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
        });
        let grains = this.state.grains.map( (e,i) => {
            return <li onClick={this.selectIngredient} key={i} data-name={e.name} data-category={e.category}><img src={e.img}/></li>
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

        return (
            <section className="application">
                <div className="container">
                    <div className="application__box">
                        <div className="fridge">
                            <div className="food_categories">
                                <span>Choose your ingredients</span>
                                <ListLabel onClick={this.dropDownList} category="Vegetables"/>
                                <ul className="eats vege hide">{vege}</ul>

                                <ListLabel onClick={this.dropDownList} category="Fruits"/>
                                <ul className="eats fruits hide">{fruits}</ul>

                                <ListLabel onClick={this.dropDownList} category="Dairy"/>
                                <ul className="eats dairy hide">{dairy}</ul>

                                <ListLabel onClick={this.dropDownList} category="Meats"/>
                                <ul className="eats meats hide">{meats}</ul>

                                <ListLabel onClick={this.dropDownList} category="Beaking & Grains"/>
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
