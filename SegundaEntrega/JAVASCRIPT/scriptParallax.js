let capa1 = document.getElementById('capa1');
let capa2 = document.getElementById('capa2');
let capa3 = document.getElementById('capa3');
let capa4 = document.getElementById('boton_reserva');
let capaProximamente = document.getElementById('id_proximamente');

let img1 = document.getElementById('cimg1');
let img2 = document.getElementById('cimg2');
let img3 = document.getElementById('cimg3');

let stats_titulo = document.getElementById('messi_stats');
let messi1 = document.getElementById('messi1');
let messi2 = document.getElementById('messi2');
let messi3 = document.getElementById('messi3');
let messi4 = document.getElementById('messi4');

window.addEventListener('scroll', ()=>{
    scroll();
    showImgs();
    unionImgs();
})

function scroll(){
    let sTop = document.documentElement.scrollTop;
    if(sTop < 215){
        capa2.style.transform = 'translateY('+sTop*-0.8+'px)';
        capa3.style.transform = 'translateY('+sTop*-1.1+'px)';
        capa4.style.transform = 'translateY('+sTop*-0.8+'px)';
        capaProximamente.style.transform = 'translateY('+sTop*-0.8+'px)';
    }
}

function showImgs(){
    let sTop = document.documentElement.scrollTop;
    if(sTop < 230){
        img1.style.right = '700px';
        img2.style.right = '700px';
        img3.style.right = '700px';
    }
    if(sTop > 260){
        img1.style.right = '0px';
        img3.style.right = '700px';
    } 
    if(sTop > 700){
        img2.style.right = '0px';
    }
    if(sTop > 1000){
        img1.style.right = '700px';
        img3.style.right = '0px';
    }
}

function unionImgs(){
    let sTop = document.documentElement.scrollTop;
    let aux = (sTop - 2000) + 30.68;
    if(sTop > 1600 && aux < 3){
        console.log(aux);
        stats_titulo.style.marginBottom = `${-aux}`+'px';
        messi1.style.left = `${aux}`+'px';
        messi2.style.left = `${aux}`+'px';
        messi3.style.right = `${aux}`+'px';
        messi4.style.bottom = `${aux}`+'px';
    }
}