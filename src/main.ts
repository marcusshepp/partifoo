/* Gravity simulation
 * 
-----
Vector forces = 0.0f;

// gravity
forces += down * m_gravityConstant; // 9.8m/s/s on earth

// left/right movement
forces += right * m_movementConstant * controlInput; // where input is scaled -1..1

// add other forces in for taste - usual suspects include air resistence
// proportional to the square of velocity, against the direction of movement. 
// this has the effect of capping max speed.

Vector acceleration = forces / m_massConstant; 
m_velocity += acceleration * timeStep;
m_position += velocity * timeStep;
-----

Particles are  created, evenly spaced across the canvas.
When the frames start, I want them to fall, due to gravity.
Particles cannot go through the floor.
Particles cannot go through eachother. 
I want them to behave similar to water molecules.
There needs to be a consistent distance around each
particle that cannot be overlapped with another particle.

I'm also trying to avoid classes because I've noticed it over complicates
things usually. But I'm so OOP brained that this has become more difficult.

 *
* */

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
    for (let x = 10; x < canvas.width * 0.99; x += 10) {
        for (let y = 10; y < canvas.height * 0.99; y += 10) {
            let particle = {
                x: x,
                y: y,
                destX: null,
                destY: null,
                v: 3,
                g: 2,
            } as Particle;
            S.particles.push(particle);
        }
    }
}

function update(): void {
    /*
    - bound the particles to the canvas container
    - calculate the distance between each particles
        - if they are close enough...
            - calculate a small velocity in the opposite direction
    - every movement/velocity change needs to take into account the 
    gravity of the floor. This will pull all particles down by some
    consistent value.


    I believe each particle should have
    - mass
    - acceleration
    - velocity x and y


    I also believe time if a factor here.
    if one particle collides with another, there is a short time 
    where the particles move away from each other.
    But after a short time, they need to move back down, due to 
    the gravity from the floor.


    * */

    for (let i = 0; i < S.particles.length; i++) {
        if (S.particles[i].y === canvas.height * 0.99) {
            S.particles[i].v *= -1;
        } else if (S.particles[i].y < 1) {
            S.particles[i].v *= -1;
        }
        S.particles[i].y += S.particles[i].v;


        for (let j = 0; j < S.particles.length; j++) {
            //if (distanceFrom(S.particles[i], S.particles[j]) < 5 &&
            //    distanceFrom(S.particles[i], S.particles[j]) > 1) {
            //    S.particles[i].v *= -1;
            //} else {
            //    S.particles[i].x *= S.velX;
            //    S.particles[i].y *= S.velY;
            //}
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
