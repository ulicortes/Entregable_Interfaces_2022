'use strict';

let menuBoton = document.querySelector('#hamburguer');
let userBoton = document.querySelector('#user');
let cruz = document.querySelector('#cruz');
let categorias = document.querySelector('.categorias');
let configuracion = document.querySelector('.configuracion');
let hijo1 = document.getElementById('hijo1');
let hijo2 = document.getElementById('hijo2');
let hijo3 = document.getElementById('hijo3');
let hijo4 = document.getElementById('hijo4');
let hijo5 = document.getElementById('hijo5');
let hijo6 = document.getElementById('hijo6');
let hijo7 = document.getElementById('hijo7');
let hijo8 = document.getElementById('hijo8');
let hijo9 = document.getElementById('hijo9');
let hijo10 = document.getElementById('hijo10');
let hijo11 = document.getElementById('hijo11');
let hijo12 = document.getElementById('hijo12');
let hijo13 = document.getElementById('hijo13');
let hijo14 = document.getElementById('hijo14');
let hijo15 = document.getElementById('hijo15');
let hijos = [];
let hijosConf = [];
hijos.push(hijo1, hijo2, hijo3, hijo4, hijo5, hijo6, hijo7, hijo8, hijo9, hijo10, hijo11);
hijosConf.push(hijo12, hijo13, hijo14, hijo15);
menuBoton.addEventListener('click', () => {
    categorias.classList.toggle('dnone');
    configuracion.classList.add('dnone');
    if (!categorias.classList.contains('dnone')) {
        menuBoton.style.opacity = '0';
        cruz.style.opacity = '1';
        let tiempo = 80;
        hijos.forEach((h) => {
            setTimeout(() => {
                h.style.left = '0px';
            }, tiempo);
            tiempo += 100;
        })
    } else {
        menuBoton.style.opacity = '1';
        cruz.style.opacity = '0';
        hijos.forEach((h) => {
            h.style.left = '-250px';
        })
    }
})
userBoton.addEventListener('click', () => {
    configuracion.classList.toggle('dnone');
    categorias.classList.add('dnone');
    if (!configuracion.classList.contains('dnone')) {
        let tiempo = 80;
        hijosConf.forEach((h) => {
            setTimeout(() => {
                h.style.right = '0px';
            }, tiempo);
            tiempo += 100;
        })
    } else {
        hijosConf.forEach((h) => {
            h.style.right = '-250px';
        })
    }
})

let carrusel = document.getElementById('carrusel');
let punto = document.querySelectorAll('.punto');
punto.forEach((p, i) => {
    punto[i].addEventListener('click', () => {
        let posicion = i;
        let movimiento = posicion * -45;
        carrusel.style.transform = `translateX(${movimiento}%)`;
        punto.forEach((pu, j) => {
            punto[j].classList.remove('desvanecido');
        })
        punto[i].classList.add('desvanecido');
    });
})

let cards = [];
let card1 = document.getElementById('card1');
let card2 = document.getElementById('card2');
let card3 = document.getElementById('card3');
let card4 = document.getElementById('card4');
let card5 = document.getElementById('card5');
cards.push(card1, card2, card3, card4, card5);

let nav = document.querySelector('.navBar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        nav.style.height = '30px';
        categorias.style.top = '30px';
        configuracion.style.top = '30px';
    } else {
        nav.style.height = '45px';
        categorias.style.top = '45px';
        configuracion.style.top = '45px';
    }

    if (window.scrollY > 1260) {
        let tiempo = 200;
        cards.forEach((c) => {
            setTimeout(() => {
                c.style.left = '0px';
            }, tiempo);
            tiempo += 300;
        })
    } else {
        cards.forEach((c) => {
            c.style.left = '-1200px';
        })
    }
})
