function ballpitEngine(elemSize = 100, floorOffset = -40) {
    const elements = document.querySelectorAll('.ball, .square');
    elements.forEach(el => {
        el.style.width = elemSize
        el.style.height = elemSize
        el.ondragstart = e => {
            e.preventDefault();
            return false;
        };
    });
    // Matter.js aliases
    const { Engine, Runner, Bodies, World, Events, Mouse, MouseConstraint } = Matter;

    // Create engine & world
    const engine = Engine.create();
    const world = engine.world;
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Get window size
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create invisible walls
    const walls = [
        Bodies.rectangle(width / 2, height + floorOffset, width, 50, { isStatic: true }), // floor
        Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true }),         // ceiling
        Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }),       // left wall
        Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true }) // right wall
    ];
    World.add(world, walls);

    // Create bodies for each DOM element
    const bodies = [];
    const squareSize = elemSize;
    const radius = elemSize / 2;
    const spawnX = width / 2;
    const spawnY = height / 2;
    const jitter = 5; // max random offset in pixels

    document.querySelectorAll(".ball").forEach(el => {
        const offsetX = (Math.random() * 2 - 1) * jitter;
        const offsetY = (Math.random() * 2 - 1) * jitter;

        let body = Bodies.circle(spawnX + offsetX, spawnY + offsetY, radius, { restitution: 0.7 });
        World.add(world, body);
        bodies.push({ el, body, shape: "circle" });
    });

    document.querySelectorAll(".square").forEach(el => {
        const offsetX = (Math.random() * 2 - 1) * jitter;
        const offsetY = (Math.random() * 2 - 1) * jitter;

        let body = Bodies.rectangle(spawnX + offsetX, spawnY + offsetY, squareSize, squareSize, { restitution: 0.7 });
        World.add(world, body);
        bodies.push({ el, body, shape: "square" });
    });

    // Add mouse constraint
    const mouse = Mouse.create(document.body);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });
    World.add(world, mouseConstraint);

    // Sync DOM elements with physics positions
    // Events.on(engine, "afterUpdate", () => {
    //     bodies.forEach(({ el, body }) => {
    //         el.style.left = body.position.x - 25 + "px";
    //         el.style.top = body.position.y - 25 + "px";
    //         el.style.transform = `rotate(${body.angle}rad)`;  // rotate in radians
    //     });
    // });
    Events.on(engine, "afterUpdate", () => {
        const boundsPadding = Math.max(radius, squareSize / 2) + 10;

        for (let i = bodies.length - 1; i >= 0; i--) {
            const { el, body, shape } = bodies[i];
            const { x, y } = body.position;

            if (
                x < -boundsPadding ||
                x > width + boundsPadding ||
                y < -boundsPadding ||
                y > height + boundsPadding
            ) {
                World.remove(world, body);
                el.remove();
                bodies.splice(i, 1);
            } else {
                if (shape === "circle") {
                    el.style.left = x - radius + "px";
                    el.style.top = y - radius + "px";
                } else if (shape === "square") {
                    el.style.left = x - squareSize / 2 + "px";
                    el.style.top = y - squareSize / 2 + "px";
                }
                el.style.transform = `rotate(${body.angle}rad)`;
            }
        }
    });
}
function ballpitRefresh() {
    return `<div class="container">
        <div class="button" style='border-radius:50%;width:40px;height:40px;font-size:150%;margin-top:10px;z-index:3' onclick="action()">
        ${fontAwesome('refresh')}
        </div>
    </div>`
}