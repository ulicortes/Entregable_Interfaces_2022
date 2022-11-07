'use strict';
let canvas = document.querySelector('#canvas');
let canvasW = canvas.width;
let canvasH = canvas.height;
/** @type {CanvasRenderingContext2D}*/
let ctx = canvas.getContext('2d');
let radio = 20;
let fichas = [];
let fichas1 = [];
let fichas2 = [];
// SABER A QUE JUGADOR LE TOCA
let ultFichaInsertada = "white";

// NRO DE FICHAS NECESARIAS PARA GANAR
// let linea = document.getElementById('selectCuantasLineas').value;

let ultImagenSeleccionada = null;
let colorFichaAnterior = null;
let isMouseDown = false;
// TIEMPO PARA QUE CORTE EL JUEGO
let time = 240;
let timePausa = 0;

let unaVez = false;
let divBotonesReSa = document.getElementById('btns_reiniciar_salir');
let botonReiniciar = document.getElementById('gameReiniciar');
let botonSalir = document.getElementById('gameSalir');
let botonActivo = false;
// BOTONES DE PAUSA Y AYUDA
let pausaBoton = document.getElementById('pausaBoton');
let ayudaBoton = document.getElementById('ayudaBoton');
let menuPausa = document.querySelector('.div_menu_pausa');
let menuAyuda = document.getElementById('menuAyuda');
let reanudar = document.getElementById('reanudar');


//PRESENTACION DE TABLERO VACIO Y DISTRIBUCION DE FICHAS DE LOS JUGADORES
function clearCanvas(){
    ctx.fillStyle = '#CCBA7C';
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = "#cc982a";
    ctx.fillRect(canvasW*0.35, canvasH*0.14, canvasW*0.31, canvasH*0.75);
}
function renderizaeElementos(){
    jugadores();
    fichas.forEach((c)=>{
        c.forEach((f)=>{
            f.dibujar();
        })
    })
    fichas1.forEach((f)=>{
        f.dibujar();
    });
    fichas2.forEach((f)=>{
        f.dibujar();
    });    
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "red";
    ctx.fillText("Tiempo restante:", canvasW/2, canvasH-30);
}
function circulo(px, py, ctx, rad){
    let x_start = canvasW*0.35;
    let y_start = canvasH*0.14;
    let ci = new Circulo(x_start+px, y_start+py, "white", ctx, false, rad, "");
    return ci;
}
function circuloFichas(px, py, color, ctx, rad, s){
    let ci = new Circulo(px, py, color, ctx, false, rad, s);
    return ci;
}
function iterar(){
    for(let c = 0; c < 405; c = c + 45){
        let columna = [];
        for(let f = 0; f < 405; f = f + 45){
            columna.push(circulo(25+c, 25+f, ctx, radio));
        }
        fichas.push(columna);
    }
}
function fichasJ1(color){
    for(let n = 0; n < 20; n++){
        let px = 90 + Math.round(Math.random()*canvasW*0.20);
        let py = 400 + Math.round(Math.random()*100);
        let c = circuloFichas(px, py, color, ctx, radio, colorJ1);
        fichas1.push(c);
    }
}
function fichasJ2(color){
    let arranque = canvasW*0.35 + canvasW*0.31 + 90;
    for(let n = 0; n < 20; n++){
        let px = arranque + Math.round(Math.random()*canvasW*0.20);
        let py = 400 + Math.round(Math.random()*100);
        let c = circuloFichas(px, py, color, ctx, radio, colorJ2);
        fichas2.push(c);
    } 
}
// LOGOS JUGADORES
function jugadores(){
    let j1 = new Image();
    let j2 = new Image();
    j1.src = '../IMG/4_en_linea_partes/j1.svg';
    j2.src = '../IMG/4_en_linea_partes/j2.svg';
    ctx.drawImage(j1, 50, 100);
    ctx.drawImage(j2, canvasW-350, 100);
}
// BOTONES DE AYUDA Y PAUSA
function ayudaPausa(){
    let ayuda = new Image();
    let pausa = new Image();
    ayuda.src = '../IMG/4_en_linea_partes/ayuda.svg';
    pausa.src = '../IMG/4_en_linea_partes/pausa.svg';
    ctx.drawImage(ayuda, 20, 15);
    ctx.drawImage(pausa, canvasW-50, 15);
}
// RELOJ CUENTA ATRAS
function timer(){
    setInterval(interval, 1000);
}
function interval(){
    clearCanvas();
    renderizaeElementos();    
    if(time > 0){
        ctx.fillStyle = "red";
        time--;
        ctx.fillText(`${tiempo(time)}`, canvasW/2, canvasH-6);
    }
    if(time == 0){
        ctx.fillText("SE TERMINO EL TIEMPO", canvasW/2, 60);
        ctx.fillText(`00`, canvasW/2, canvasH-6);
        setTimeout(() => {
            divBotonesReSa.classList.remove('dnone');
            divBotonesReSa.classList.add('pos_abs');
            botonActivo = true;
        }, 1000);
    }
    if(time == -1){
        ctx.fillStyle = ultImagenSeleccionada.pintar();
        ctx.font = "bold 40px Arial";
        ctx.strokeStyle = "black";
        if(ultImagenSeleccionada.pintar() == '#5d79ae'){
            ctx.fillText("Ganan los antiterroristas", canvasW/2, 60);
            ctx.strokeText("Ganan los antiterroristas", canvasW/2, 60);
        }
        else if(ultImagenSeleccionada.pintar() == '#de9b35'){
            ctx.fillText("Ganan los terroristas", canvasW/2, 60);
            ctx.strokeText("Ganan los terroristas", canvasW/2, 60);
        }
        setTimeout(() => {
            divBotonesReSa.classList.remove('dnone');
            divBotonesReSa.classList.add('pos_abs');
            botonActivo = true;
        }, 1000);
    }
    if(time == -2){
        ctx.fillStyle = "red";
        ctx.fillText(timePausa, canvasW/2, canvasH-6);
    }
}
// CHECKEA SI EL NRO TIENE QUE TENER UN 0 ADELANTE
function tiempo(t){
    if(t < 10){
        return `0${t}`;
    }else{return t;}
}

//SE VE SI EL PUNTERO ESTA ADENTRO DE UN CIRCULO
function checkear(x, y){
    for(let i = 0; i < fichas1.length; i++){
        if(fichas1[i].punteroAdentro(x, y)){
            return fichas1[i];
        }
    }
    for(let i = 0; i < fichas1.length; i++){
        if(fichas2[i].punteroAdentro(x, y)){
            return fichas2[i];
        }
    }
    return null;
}
//CALCULAR LA POSICION DEL PUNTERO
function getPosicionMouse(canvas, event){
    let ClientRect = canvas.getBoundingClientRect();
    return {
        x: Math.round(event.clientX - ClientRect.left),
        y: Math.round(event.clientY - ClientRect.top)
    }
}

//FUNCIONES DE EVENTOS DEL MOUSE
function hagoClick(e){
    if(!botonActivo){
        isMouseDown = true;
        let m = getPosicionMouse(canvas, e);
        let check = checkear(m.x, m.y);

        if(ultImagenSeleccionada != null){
            ultImagenSeleccionada = null;
        }

        if( check != null && (check.pintar() != ultFichaInsertada) ){
            colorFichaAnterior = check.pintar();
            ultImagenSeleccionada = check;
        }
        clearCanvas();
        renderizaeElementos();
    }
}
function muevoMouse(e){
    if(isMouseDown && ultImagenSeleccionada != null && !botonActivo){
        let m = getPosicionMouse(canvas, e);
        ultImagenSeleccionada.setPosition(m.x, m.y);
        clearCanvas();
        renderizaeElementos();
        ctx.fillText(`${tiempo(time)}`, canvasW/2, canvasH-6);
        if(seFueDelCanvas(e)){
            isMouseDown = false;
        }
    }
}
function dejoDeHacerClick(e){
    if(!botonActivo){
        isMouseDown = false;
        if(getEspacio(e)){
            let color = ultImagenSeleccionada.getSource()
            let col = getColumna(e);
            let fil = queFilaEs(col, color);

            if(fil != -1){
                let index1 = fichas1.indexOf(ultImagenSeleccionada);
                let index2 = fichas2.indexOf(ultImagenSeleccionada);
                if (index1 > -1) {
                    fichas1.splice(index1, 1);
                } else if(index2 > -1){
                    fichas2.splice(index2, 1);
                }
                ultFichaInsertada = ultImagenSeleccionada.pintar();
                clearCanvas();
                renderizaeElementos();
                checkearGanador(col, fil);
            }
        }
    }
}
//VE LA COLUMNA EN LA QUE DEJO LA FICHA Y DESPUES VE EN QUE FILA VA A CAER
function queFilaEs(c, color){
    let terminar = false;
    for(let columna = 0; columna < 9; columna++){
        if(columna == (c-1)){
            let p = 8;
            while(!terminar){
                if(fichas[columna][p].getSource() == ""){
                    fichas[columna][p].setSource(color);
                    terminar = true;
                }
                p--;
            }
            return p+1;
        }
    }
    return -1;
}


// LISTENERS
pausaBoton.addEventListener('click', ()=>{
    menuPausa.classList.remove('dnone');
    if(!menuAyuda.classList.contains('dnone')){
        menuAyuda.classList.add('dnone');
    }
    timePausa = time;
    time = -2;
});
ayudaBoton.addEventListener('click', ()=>{
    menuAyuda.classList.toggle('dnone');
    if(!menuPausa.classList.contains('dnone')){
        menuPausa.classList.add('dnone');
    }
})
reanudar.addEventListener('click', ()=>{
    menuPausa.classList.add('dnone');
    time = timePausa;
})
canvas.addEventListener('mousedown', hagoClick, false);
canvas.addEventListener('mousemove', muevoMouse, false);
canvas.addEventListener('mouseup', dejoDeHacerClick, false);
botonReiniciar.addEventListener('click', ()=>{
    location.reload();
})

//VE EN QUE COLUMNA DEJO LA FICHA
function getColumna(e){
    let x_start = canvasW*0.36;
    for(let i = 1; i < 10; i++){
        if(e.offsetX > x_start + (44*(i-1)) && e.offsetX < x_start + (44*i)){
            return i;    
        }
    }
    return 0;
}
//VERIFICA SI DEJO LA FICHA EN EL ESPACIO ENCIMA DEL TABLERO
function getEspacio(e){
    let y_start = canvasH*0.14;
    let x_start = canvasW*0.36;
    if(e.offsetY > 0 && e.offsetY < y_start && e.offsetX > x_start && e.offsetX < (x_start + canvasW*0.31)){
        return true;    
    }
    return false;
}
//VERIFICA SI HAY 4 EN LINEA EN TODAS LAS DIRECCIONES
function checkearGanador(col, fil){
    let contador = 0;
    let contColumna = ckeckearGanadorCol(col, fil, contador);
    let contFilaAdelante = ckeckearGanadorFilAd(fil, (col-1), contador);
    let contFilaAtras = ckeckearGanadorFilAt(fil, (col-1), contador);
    let contFila = contFilaAdelante + contFilaAtras;
    let diagonalNO = ckeckearGanadorDiagonalNO(fil, (col-1), contador);
    let diagonalNE = ckeckearGanadorDiagonalNE(fil, (col-1), contador);
    let diagonalSO = ckeckearGanadorDiagonalSO(fil, (col-1), contador);
    let diagonalSE = ckeckearGanadorDiagonalSE(fil, (col-1), contador);
    if( contColumna > linea - 2 || contFila > linea - 2 || diagonalNO+diagonalSE > linea - 2 || diagonalNE+diagonalSO > linea - 2){
        time = -1;
    }
}
//COLUMNA
function ckeckearGanadorCol(col, fila, contador){
    let cont = contador;
    let f = fila;
    while(f < 8){
        if(fichas[col-1][f+1].getSource() != ultImagenSeleccionada.getSource()){
            break;
        }else{
            cont++;
            f++;
        }
    }
    return cont;
}
// DE LA FICHA HACIA ADELANTE
function ckeckearGanadorFilAd(f, col, contador){
    let cont = contador;
    let c = col;
    while(c < 8){
        if(fichas[c+1][f].getSource() != ultImagenSeleccionada.getSource()){
            break;
        }
        cont++;
        c++;
    }
    return cont;
}
// DE LA FICHA HACIA ATRAS
function ckeckearGanadorFilAt(f, col, contador){
    let cont = contador;
    let c = col;
    while(c > 0){
        if(fichas[c-1][f].getSource() != ultImagenSeleccionada.getSource()){
            break;
        }else{
            cont++;
            c--;
        }
    }
    return cont;
}
// DE LA FICHA HACIA EL SURESTE
function ckeckearGanadorDiagonalSE(fila, col, contador){
    let cont = contador;
    let c = col;
    let f = fila;
    while(c < 8 && f < 8){
        if(fichas[c+1][f+1].getSource() != ultImagenSeleccionada.getSource()){
            break;
        }else{
            cont++;
            c++;
            f++;
        }
    }
    return cont;
}
// DE LA FICHA HACIA EL SUROESTE
function ckeckearGanadorDiagonalSO(fila, col, contador){
    let cont = contador;
    let c = col;
    let f = fila;
    while(c > 0 && f < 8){
        if(fichas[c-1][f+1].getSource() != ultImagenSeleccionada.getSource()){
            break;;
        }else{
            cont++;
            c--;
            f++;
        }
    }
    return cont;
}
// DE LA FICHA HACIA EL NOROESTE
function ckeckearGanadorDiagonalNO(fila, col, contador){
    let cont = contador;
    let c = col;
    let f = fila;
    while(c > 0 && f > 0){
        if(fichas[c-1][f-1].getSource() != ultImagenSeleccionada.getSource()){
            break;;
        }else{
            cont++;
            c--;
            f--;
        }
    }
    return cont;
}
// DE LA FICHA HACIA EL NORESTE
function ckeckearGanadorDiagonalNE(fila, col, contador){
    let cont = contador;
    let c = col;
    let f = fila;
    while(c < 8 && f > 0){
        if(fichas[c+1][f-1].getSource() != ultImagenSeleccionada.getSource()){
            break;
        }else{
            cont++;
            c++;
            f--;
        }
    }
    return cont;
}
// VERIFICA QUE EL PUNTERO ESTE ADENTRO DEL CANVAS
function seFueDelCanvas(e){
    return e.offsetX < 1 || e.offsetX > canvasW-1 || e.offsetY < 1 || e.offsetY > canvasH-1;
}