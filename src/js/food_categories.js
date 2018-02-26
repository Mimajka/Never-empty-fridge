import {
    apple, banana, beef, bread, carrot, cheese, chicken, eggs, fish, flour, milk, onion, orange, pasta, pear, pork, potato, rice, tomato, yogurt
}
from "./images";

const vegetables = [{name: "carrot", img: carrot, category: "vege"}, {name: "onion", img: onion, category: "vege" }, {name: "potato", img: potato, category: "vege"}, {name: "tomato", img: tomato, category: "vege"}];

const fruits = [{name: "apple", img: apple, category: "fruits"}, {name: "pear", img: pear, category: "fruits"}, {name: "orange", img: orange, category: "fruits"}, {name: "banana", img: banana, category: "fruits"} ];

const dairy = [{name: "milk", img: milk, category: "dairy"}, {name: "yogurt", img: yogurt, category: "dairy"}, {name: "cheese", img: cheese, category: "dairy"}, {name: "eggs", img: eggs, category: "dairy"} ];


const meats = [{name: "pork", img: pork, category: "meats"}, {name: "beef", img: beef, category: "meats"}, {name: "chicken", img: chicken, category: "meats"}, {name: "fish", img: fish, category: "meats"} ];

const grains = [{name: "flour", img: flour, category: "grains"}, {name: "rice", img: rice, category: "grains"}, {name: "pasta", img: pasta, category: "grains"}, {name: "bread", img: bread, category: "grains"} ];


export {vegetables, fruits, dairy, meats, grains}