'use strict';
let pregame = document.getElementById('pregame');
let gameJugar = document.getElementById('gameJugar');
let game = document.getElementById('game');
let linea = null;
let colorJ1 = null;
let colorJ2 = null;
let habilitado = false;
gameJugar.addEventListener('click', ()=>{
    pregame.classList.add('dnone');
    game.classList.remove('dnone');
    canvas.classList.remove('dnone');
    linea = document.getElementById('selectCuantasLineas').value;
    colorJ1 = `../IMG/4_en_linea_partes/${document.getElementById('selectCt').value}.svg`;
    colorJ2 = `../IMG/4_en_linea_partes/${document.getElementById('selectTt').value}.svg`;
    clearCanvas();
    iterar();
    fichasJ1("#5d79ae");
    fichasJ2("#de9b35");
    renderizaeElementos();
    timer();
})

function getNroLinea(){
    return linea;
}
function getColores(){
    return {
        j1: colorJ1,
        j2: colorJ2
    }
}

let menuBoton = document.querySelector('#hamburguer');
let userBoton = document.querySelector('#user');
let categorias = document.querySelector('.categorias');
let configuracion = document.querySelector('.configuracion');
menuBoton.addEventListener('click', ()=>{
    categorias.classList.toggle('dnone');
    configuracion.classList.add('dnone');
})
userBoton.addEventListener('click', ()=>{
    configuracion.classList.toggle('dnone');
    categorias.classList.add('dnone');
})

let carrusel = document.getElementById('carrusel');
let punto = document.querySelectorAll('.punto');
punto.forEach( (p, i)=>{
    punto[i].addEventListener('click', ()=>{
        let posicion = i;
        let movimiento = posicion * -45;
        carrusel.style.transform = `translateX(${movimiento}%)`;
        punto.forEach((pu, j)=>{
            punto[j].classList.remove('desvanecido');
        })
        punto[i].classList.add('desvanecido');
    });
})