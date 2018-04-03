console.log('Superheroes');

const printToDom = (string,id) => {
    document.getElementById(id).innerHTML = string;
}

const buildDomString = (data) => {
    string = '';
    for(let i = 0; i < data.length; i++){
        string += `<div class='col-md-3'>`;
        string +=   `<div class='panel'>`;
        string +=       `<div class='panel-heading'>`;
        string +=           `<h3 class='panel-title'>${data[i].name}</h3>`;
        string +=       `</div>`;
        string +=       `<div class='panel-body'>`;
        if(data[i].gender === 'Male'){
            string += `<img class='charImage maleImage' src='${data[i].image}'>`;
        }else{
            string += `<img class='charImage femaleImage' src='${data[i].image}'>`;
        }
        string +=           `<p class='charDescription'>${data[i].description}</p>`;
        string +=       `</div>`; 
        string +=   `</div>`;
        string += `</div>`;
    }
    printToDom(string,'heroes');
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
