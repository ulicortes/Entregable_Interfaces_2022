'use strict';
window.addEventListener('DOMContentLoaded', (event) => {
    let bodyDiv = document.querySelector('.body_div');
    let footer = document.getElementById('fter');
    let loader = document.querySelector('#loader_');
    let porcentaje = document.getElementById('porcentaje');
    let buleano = true;
    function avanzarPorcentaje(buleano, p){
        setInterval(() => {
            if(buleano){
                let n = p.innerHTML[0];
                console.log("n0 = "+n);
                if(p.innerHTML[1] !== '%'){
                    n = n + p.innerHTML[1];
                }
                n = parseInt(n) + 10;
                p.innerHTML = `${n}%`;
                console.log("n1 = "+n);
            }
        }, 600);
        setTimeout(function(){
            loader.classList.add('dnone');
            porcentaje.classList.add('dnone');
            footer.classList.remove("dnone");
            footer.classList.add("flex_row");
            bodyDiv.classList.remove("dnone");
            buleano = false;
        }, 6060);
    }
    avanzarPorcentaje(buleano, porcentaje);
});
