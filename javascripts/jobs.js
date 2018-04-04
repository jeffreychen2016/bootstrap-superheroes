console.log('Superheroes');

const printToDom = (string,id) => {
    document.getElementById(id).innerHTML = string;
}

const buildDomString = (data) => {
    string = '';
    for(let i = 0; i < data.length; i++){
        string += `<li>`;
        string +=   `<a href="#" data-hero-id="${data[i].id}">${data[i].name}</a>`;
        string += `</li>`;
    }
    printToDom(string,'awesome-dropdown');
}

function executeThisCodeAfterFileLoaded(){
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
}

function executeThisCodeIfFails(){
    console.log('error');
}

const startApplication = () => {
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.addEventListener('load',executeThisCodeAfterFileLoaded);
    xhrRequest.addEventListener('error',executeThisCodeIfFails);
    xhrRequest.open('GET','../db/superheroes.json');
    xhrRequest.send();
}

startApplication();
