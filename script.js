const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 200;
const ctx = canvas.getContext('2d')

//Posição inicial do jogador
let y = 100
let x = 100

let quadrado = 20
//ultima posição de x e y
let ultimaX = 0
let ultimaY = 0

//Vida que o jogador começa
let vida = 80

//Aumenta a quantidade de vida
function maisVida() {
    let elem = document.getElementById("barStatus")
    vida += 40
    elem.style.width = vida + "%"
}
//Diminui a quantidade de vida
function menosVida() {
    let elem = document.getElementById("barStatus")
    vida -= 0.2
    elem.style.width = vida + "%"
}
function DiminuiVida() {
    let elem = document.getElementById("barStatus")
    vida -= 5
    elem.style.width = vida + "%"
}

class BlocoVida {
    constructor(x, y, tamanho, cor) {
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.cor = cor;
    }

    desenharV() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.tamanho, this.tamanho);
    }
}
class TiraVida {
    constructor(x, y, tamanho, cor) {
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.cor = cor;
    }

    desenharM() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.tamanho, this.tamanho);
    }
}
let quadradoV = []
let quadradoM = []

function geraMorte(){
    for (let i = 0; i < 60; i++) {
        quadradoM.push(
            new TiraVida(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                10,
                "blue"
            )
        );
    }
}
geraMorte()

function geraVida() {
    for (let i = 0; i < 4; i++) {
        quadradoV.push(
            new BlocoVida(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                10,
                "red"
            )
        );
    }
}
geraVida()

function renderPerso(){
    //Essa função renderiza o personagem
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "yellow"
    ctx.fillRect(x, y, quadrado, quadrado)
}

function renderDeBlocos(){
    //Essa função limita o espaço do personagem
    //E limita a barra de vida além de matar o personagem se a vida chegar a 0

    if (x > canvas.width - quadrado) {
        x = canvas.width - quadrado;
    }
    if (y > canvas.height - quadrado) {
        y = canvas.height - quadrado
    }
    if (x < 0) {
        x = 0
    }
    if (y < 0) {
        y = 0
    }
    if (vida >= 100) {
        vida = 100
    }
    if (vida < 0) {
        vida = 0
    }
    if (vida == 0) {
        document.querySelector('h1').textContent = "Game Over!"
        document.removeEventListener('keydown', teclado)
    }
}

function blocos(){
    //Essa função gera os blocos que dão vida e tiram vida
    let i = 0
    for (let quadradoUm of quadradoV) {
        //Condição para detectar uma colisão
        if (ultimaX < quadradoUm.x + quadradoUm.tamanho &&
            ultimaX + quadrado > quadradoUm.x &&
            ultimaY < quadradoUm.y + quadradoUm.tamanho &&
            ultimaY + quadrado > quadradoUm.y) {
            quadradoV.splice(i, 1)
            maisVida()
        }
        if(quadradoV == 0){
            geraVida()
        }
        quadradoUm.desenharV();
        i++
    }

    //Bloco que mata
    let j = 0
    for (let quadradoDois of quadradoM) {
        //Condição para detectar uma colisão
        if (ultimaX < quadradoDois.x + quadradoDois.tamanho &&
            ultimaX + quadrado > quadradoDois.x &&
            ultimaY < quadradoDois.y + quadradoDois.tamanho &&
            ultimaY + quadrado > quadradoDois.y) {
            quadradoM.splice(j, 1)
            DiminuiVida()
        }
        if(quadradoM == 0){
            geraMorte()
        }
        quadradoDois.desenharM();
        j++
    }
}

function animacao() {
    requestAnimationFrame(animacao)
    renderPerso()
    renderDeBlocos()
    menosVida()
    ultimaX = x
    ultimaY = y
    blocos()

}
animacao()
//Um ouvinte para pegar as teclas apertadas peo usuário
document.addEventListener('keydown', teclado);
function teclado(e) {
    if (e.key == "w" || e.key == "W") {
        y = y - 10
    } else if (e.key == "s" || e.key == "S") {
        y = y + 10
    } else if (e.key == "a" || e.key == "A") {
        x = x - 10
    } else if (e.key == "d" || e.key == "D") {
        x = x + 10
    }
}