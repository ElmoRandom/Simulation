Matter.use('matter-attractors');

let Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Body = Matter.Body,
Composite = Matter.Composite,
Composites = Matter.Composites,
Constraint = Matter.Constraint,
Mouse = Matter.Mouse,
MouseConstraint = Matter.MouseConstraint,
Events = Matter.Events;

let engine;
let render;
let runner;
let numParticle;
let WIDTH = 800;
let HEIGHT = 800;
let PARTICLE_SPEED = 3;

function init() {
    // create an engine
    engine = Engine.create();
   
    // create a renderer
    render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
    width: WIDTH,
    height: HEIGHT,
    pixelRatio: 1,
    background: '#fafafa',
    wireframes: false // <-- important
    }
    });
   
    // run the renderer
    Render.run(render);
   
    // create runner
    runner = Runner.create();
   
    // run the engine
    Runner.run(runner, engine);
    createWorld();
    engine.world.gravity.y = 0;
    
    //making perfect elastic collision
    Events.on(engine, "collisionStart", e => {
        e.pairs.forEach(pair => {
            var bodyA= pair.bodyA;
            var bodyB = pair.bodyB;
            if (bodyA.label === "wallH") Body.setVelocity(bodyB, { x: bodyB.velocity.x, y: -bodyB.velocity.y }) //Horizontal wall collision
            else if (bodyB.label === "wallH") Body.setVelocity(bodyA, { x: bodyA.velocity.x, y: -bodyA.velocity.y }) //Horizontal wall collision
            else if (bodyA.label === "wallV") Body.setVelocity(bodyB, { x: -bodyB.velocity.x, y: bodyB.velocity.y }) //Vertical wall collision
            else if (bodyB.label === "wallV") Body.setVelocity(bodyA, { x: -bodyA.velocity.x, y: bodyA.velocity.y }) //Vertical wall collision
            else { //Two balls collision
                const vAXBefore = bodyA.velocity.x;
                const vBXBefore = bodyB.velocity.x;
                const vAYBefore = bodyA.velocity.y;
                const vBYBefore = bodyB.velocity.y;
                const mA = bodyA.mass
                const mB = bodyB.mass
                const { vAFinal: vAXFinal, vBFinal: vBXFinal } = calcElasticCollision(mA, mB, vAXBefore, vBXBefore)
                const { vAFinal: vAYFinal, vBFinal: vBYFinal } = calcElasticCollision(mA, mB, vAYBefore, vBYBefore)
                if (bodyA.label !== "wall") Body.setVelocity(bodyA, { x: vAXFinal, y: vBXFinal })
                if (bodyB.label !== "wall") Body.setVelocity(bodyB, { x: vAYFinal, y: vBYFinal })
            }
        })
    })
}

let lastClear = "(not given)"
function clearWorld() {
 Composite.clear(engine.world, false);
}

function createWorld(){
    clearWorld("Wall")
    let floor = Bodies.rectangle(0, HEIGHT, WIDTH * 2, 1, {
        isStatic: true,
        restitution: 1,
        label: "wallH"
    });
    
    let ceil = Bodies.rectangle(0,0 ,WIDTH*2, 1, {
        isStatic: true,
        restitution: 1,
        label: "wallH"
    });
    let leftWall = Bodies.rectangle(0,0,1, HEIGHT*2, {
        isStatic: true,
        restitution: 1,
        label: "wallV"
    });
    let rightWall = Bodies.rectangle(WIDTH, 0 ,1, HEIGHT*2, {
        isStatic: true,
        restitution: 1,
        label: "wallV"
    });
    Composite.add(engine.world, [floor, ceil, rightWall, leftWall]);
    
}

let makeParticle = function() {
    const particleMargin = 4;
    const p = Matter.Bodies.circle(
        (Math.random() * (WIDTH - particleMargin)) +
            (particleMargin / 2),
        (Math.random() * (HEIGHT - particleMargin)) +
            (particleMargin / 2),
        3, {
            render: {
                fillStyle: '#6666A0',
                lineWidth: 1.5
            },
            restitution: 1,
            friction: 0,
            frictionAir: 0,
            plugin: {
                attractors: [
                    function(bodyA, bodyB) {
                          var force = {
                            x: (bodyA.position.x - bodyB.position.x) * 1e-9,
                            y: (bodyA.position.y - bodyB.position.y) * 1e-9,
                          };
                          // apply force to both bodies
                          Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
                          Body.applyForce(bodyB, bodyB.position, force);
                  
                    }
                ]
            }
        });

    Matter.Body.setInertia(p, Infinity);

    const direction = Math.random() * Math.PI * 2;
    Matter.Body.setVelocity(p, {
        x: Math.sin(direction) * PARTICLE_SPEED,
        y: Math.cos(direction) * PARTICLE_SPEED
    });


    return p;
};
