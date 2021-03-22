let nextPage = "";
let lastPage = "";
let currentApiUrl = "";

function next(){

    currentApiUrl = nextPage;
    findRAMCharacters();

}

function back(){

    currentApiUrl = lastPage;
    findRAMCharacters();

}

function search(){

    currentApiUrl = "https://rickandmortyapi.com/api/character";
    findRAMCharacters();

}

function findRAMCharacters(){

    document.getElementById("results").innerHTML = "";
    let data = undefined;
    let request = new XMLHttpRequest;
    request.open('GET', currentApiUrl, true);
    request.send();

    request.onreadystatechange = function(){

        if (this.readyState == 4 && this.status == 200){

            //document.getElementById("footerPage").style.display = "none";
            let resultRawData = this.response; 
            let data = JSON.parse(resultRawData);
            showApiData(data);

        }

    }

}

function showApiData(data){

    let element = document.getElementById("tabla");
    element.innerHTML = "";
    console.log(data);
    for(let i = 0; i < data.results.length; i++ ){

        let row = element.insertRow(element.rows.length);
        let celdaImg = row.insertCell(0);
        let celdInfo = row.insertCell(1);

        celdaImg.innerHTML = `<img src="${data.results[i].image}"> <hr>`;
        const nombre = `<p>Nombre: ${data.results[i].name}</p> `;
        const genero = `<p>Genero: ${data.results[i].gender}</p>`;
        const especie = `<p>Especie: ${data.results[i].species}<p>`;
        celdInfo.innerHTML = nombre +  genero + especie + "<br><br><hr>";
    

    }


    if(data.info.next != null){

        document.getElementById("buttonNext").style.display = "inline";
        nextPage = data.info.next; 

    }
    else 
        document.getElementById("buttonNext").style.display = "none";

    if(data.info.prev != null){

        document.getElementById("buttonBack").style.display = "inline";
        lastPage = data.info.prev;

    }
    else
        document.getElementById("buttonBack").style.display = "none";

}