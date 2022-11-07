class Circulo {
    constructor(px, py, color, context, res, radio, source){
        this.x = px;
        this.y = py;
        this.color = color;
        this.context = context;
        this.resaltado = res;
        this.radio = radio;
        this.source = source;
    }
    posX(){
        return this.x;
    }
    posY(){
        return this.y;
    }
    pintar(){
        return this.color;
    }
    setColor(color){
        this.color = color;
    }
    setSource(s){
        this.source = s;
    }
    getSource(){
        return this.source;
    }
    getResaltado(){
        return this.resaltado;
    }
    setResaltado(r){
        this.resaltado = r;
    }
    setPosition(px, py){
        this.x = px;
        this.y = py;
    }
    getRadius(){
        return this.radius;
    }
    dibujar(){
        this.context.beginPath();
        let j1 = new Image();
        j1.src = this.source;
        this.context.fillStyle = this.color;
        this.context.arc(this.posX(), this.posY(), this.radio, 0, 2 * Math.PI);
        this.context.fill();
        this.context.drawImage(j1, this.posX()-20, this.posY()-20);

        if(this.resaltado){
            this.context.lineWidth = 5;
            ctx.strokeStyle = "red";
            this.context.stroke();
            this.setResaltado(true);
        }
        this.context.stroke();
        this.context.closePath();
    }
    coordenadas(){
        return {
            x : this.posX(),
            y : this.posY()
        }
    }
    punteroAdentro(x, y){
        let _x = this.posX() - x;
        let _y = this.posY() - y;
        
        return Math.sqrt((_x * _x) + (_y * _y)) < this.radio;
    }
}