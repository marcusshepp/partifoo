const canvas: HTMLCanvasElement = document.querySelector(".canvas");
const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
canvas.width = 400;
canvas.height = 400;
context.fillStyle = "white";

let S = {

    numberOfParticles: 1000,
    particleRadius: 2,
    particles: [],
    theda: 0,
    outerTheda: 0,
    centerParticle: {x: 90, y: 200},
    velX: 1,
    velY: 1,


};

interface Particle {
    x: number;
    y: number;
    g: number;
    destY: number;
    destX: number;
}

function init(): void {
    for (let i = 0; i < S.numberOfParticles; i++) {
        const ranX: number = Math.floor(Math.random() * canvas.width);
        const ranY: number = Math.floor(Math.random() * canvas.height);
        const destX: number = Math.floor(Math.random() * canvas.width);
        const destY: number = Math.floor(Math.random() * canvas.height);
        let particle = {
            x: ranX,
            y: ranY,
            destX: destX,
            destY: destY,
            v: 0.5,
            g: 2,
        } as Particle;
        S.particles.push(particle);
    }
}

function update(): void {


    for (let i = 0; i < S.particles.length; i++) {

        const p = S.particles[i];
        if (p.x < p.destX) {
            S.particles[i].x += S.particles[i].v;
        }
        if (p.x > p.destX) {
            S.particles[i].x -= S.particles[i].v;
        }
        if (p.y > p.destY) {
            S.particles[i].y -= S.particles[i].v;
        }
        if (p.y < p.destY) {
            S.particles[i].y += S.particles[i].v;
        }

        if (S.particles[i].x > (canvas.width * .98)) {
            S.particles[i].v *= -1;
        }

        if (S.particles[i].y > (canvas.height * .98)) {
            S.particles[i].v *= -1;
        }

        if (S.particles[i].x < 10) {
            S.particles[i].v *= -1;
        }

        if (S.particles[i].y < 10) {
            S.particles[i].v *= -1;
        }

        if (S.particles[i].x === S.particles[i].destX &&
            S.particles[i].y === S.particles[i].destY) {

            const destX: number = Math.floor(Math.random() * canvas.width);
            const destY: number = Math.floor(Math.random() * canvas.height);
            S.particles[i].destX = destX;
            S.particles[i].destY = destY;

        }
        for (let j = 0; j < S.particles.length; j++) {
            if (distanceFrom(S.particles[i], S.particles[j]) < 5 &&
                distanceFrom(S.particles[i], S.particles[j]) > 1) {
                S.particles[i].v *= -1;
            } else {
                S.particles[i].x *= S.velX;
                S.particles[i].y *= S.velY;
            }
        }
    }

}

function draw(): void {

    for (let i = 0; i < S.particles.length; i++) {
        const part = S.particles[i];
        drawParticle(part);
    }
}

function distanceFrom(part1: Particle, part2: Particle): number {
   return Math.hypot(part1.x - part2.x, part1.y - part2.y); 
}


function drawParticle(part: {x: number, y: number}) {
    context.beginPath();
    context.arc(part.x, part.y, S.particleRadius, 0, 2 * Math.PI);
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
