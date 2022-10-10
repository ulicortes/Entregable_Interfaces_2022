'use strict';
window.addEventListener('DOMContentLoaded', (event) => {

    if(window.location.pathname == '/HTML/juegoCorriendo.html'){
        let pregame = document.getElementById('pregame');
        let gameJugar = document.getElementById('gameJugar');
        let game = document.getElementById('game');
        gameJugar.addEventListener('click', ()=>{
            pregame.classList.add('dnone');
            game.classList.remove('dnone');
        })
    
        let pausaBoton = document.getElementById('pausaBoton');
        let ayudaBoton = document.getElementById('ayudaBoton');
        let menuPausa = document.querySelector('.div_menu_pausa');
        let menuAyuda = document.getElementById('menuAyuda');
        pausaBoton.addEventListener('click', ()=>{
            menuPausa.classList.toggle('dnone');
            if(!menuAyuda.classList.contains('dnone')){
                menuAyuda.classList.add('dnone');
            }
        });
        ayudaBoton.addEventListener('click', ()=>{
            menuAyuda.classList.toggle('dnone');
            if(!menuPausa.classList.contains('dnone')){
                menuPausa.classList.add('dnone');
            }
        })
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
});