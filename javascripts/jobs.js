let selectedHero = '';

const printToDom = (string,id) => {
    document.getElementById(id).innerHTML = string;
}

const buildDomString = (data) => {
    string = '';
    for(let i = 0; i < data.length; i++){
        string += `<li>`;
        string +=   `<a href="#" data-hero-id="${data[i].id}" class='hero-name'>${data[i].name}</a>`;
        string += `</li>`;
    }
    printToDom(string,'awesome-dropdown');
}

function executeThisCodeAfterFileLoaded(){
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
    addHeroSelectionEventListeners();
}

function executeThisCodeIfFails(){
    console.log('error');
}

//select a hero, 
//load data from JSON,
//compare selection to the JSON, 
//dislpay hero details
const addHeroSelectionEventListeners = () => {
    const allElements = document.getElementsByClassName('hero-name');
    for(let i = 0; i < allElements.length; i++){
        allElements[i].addEventListener('click',selectHero);
    }
}

const selectHero = (e) => {
    selectedHero = e.target.dataset.heroId;
    document.getElementById('job-button').classList.add('hide');
    genericHeroRequest(loadFileforSingleHero);
}

function loadFileforSingleHero(){
    const data = JSON.parse(this.responseText);
    displaySuperhero(data.superheroes);
}

const displaySuperhero = heroes => {
    let domString = "";
    heroes.forEach(hero => {
      if (hero.id === selectedHero) {
        domString += `<div class="row">`;
        domString += `<div class="col-sm-4">`;
        if (hero.gender === "Male") {
          domString += `<img class="charImage maleImage" src="${
            hero.image
          }">`;
        } else {
          domString += `<img class="charImage femaleImage" src="${
            hero.image
          }">`;
        }
        domString += `</div>`;
        domString += `<div class="col-sm-6">`;
        domString += `<h2>Selected Hero: ${hero.name}</h2>`;
        domString +=     `<p class='charDescription'>${hero.description}</p>`;
        domString += `</div>`;
      }
    });
    printToDom(domString, "selected-hero");
  };

//end


const genericHeroRequest = (successFunction) => {
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.addEventListener('load',successFunction);
    xhrRequest.addEventListener('error',executeThisCodeIfFails);
    xhrRequest.open('GET','../db/superheroes.json');
    xhrRequest.send();
}

const startApplication = () => {
    genericHeroRequest(executeThisCodeAfterFileLoaded);
}

startApplication();
