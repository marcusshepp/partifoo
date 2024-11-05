const canvas: HTMLCanvasElement = document.querySelector(".canvas");
const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
canvas.width = 400;
canvas.height = 400;
context.fillStyle = "white";

let State = {

    numberOfParticles: 1,
    particleRadius: 3,
    particles: [],
    theda: 0,
    outerTheda: 0,
    centerParticle: {x: 90, y: 200},
    velX: 1,
    velY: 1,


};

function init(): void {
    for (let i = 0; i < State.numberOfParticles; i++) {
        let particle = {
            x: 0,
            y: 0,
        };
        State.particles.push(particle);
    }
}

function update(): void {
    /*
     * The equation of a circle is (x − a)2 + (y − b)2 = r2 
     * where a and b are the coordinates of the center (a, b)
     * and r is the radius.
    * */

    State.theda += 0.02;
    State.outerTheda += 0.05;
    for (let i = 0; i < State.particles.length; i++) {

        let a = State.centerParticle.x;
        let b = State.centerParticle.y;        
        let r = 50;
        let x = a + r * Math.cos(State.outerTheda);
        let y = b + r * Math.sin(State.outerTheda);
        State.particles[i].x = x;
        State.particles[i].y = y;

    }

    //
    //let a = canvas.width / 2;
    //let b = canvas.height / 2;
    //let r = 50;
    //let x = a + r * Math.cos(State.theda);
    //let y = b + r * Math.sin(State.theda);
    //
    //State.centerParticle.x = x;
    //State.centerParticle.y = y;

    State.centerParticle.x += State.velX;
    State.centerParticle.y += State.velY;

    if (State.centerParticle.x > (canvas.width * .98)) {
       State.velX = State.velX * -0.1 * Math.PI;
    }

    if (State.centerParticle.y > (canvas.height * .98)) {
       State.velY = State.velY * -0.1 * Math.PI; 
    }

    if (State.centerParticle.x < 10) {
       State.velX = State.velX * -0.1 * Math.PI; 
    }

    if (State.centerParticle.y < 10) {
       State.velY = State.velY * -0.1 * Math.PI; 
    }
}

function draw(): void {

    for (let i = 0; i < State.particles.length; i++) {
        const part = State.particles[i];
        drawParticle(part);
    }
    drawParticle(State.centerParticle);
}


function drawParticle(part: {x: number, y: number}) {
    context.beginPath();
    context.arc(part.x, part.y, State.particleRadius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}

function loop(): void {
    context.clearRect(0, 0, canvas.height, canvas.width);
    update();
    draw();
    requestAnimationFrame(loop);
}

init();
loop();
