function ballpitEngine(elemSize, floorOffset) {
    ballpitLoaded = true
    
    const elements = document.querySelectorAll('.ball, .square');
    elements.forEach(el => {
        el.style.width = elemSize
        el.style.height = elemSize
        el.addEventListener("dragstart", e => {
            e.preventDefault();
            return false;
        }, { passive: false });
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
    const spawnX = width / 2;
    const spawnY = height / 2;
    const jitter = 5; // max random offset in pixels

    document.querySelectorAll(".ball").forEach(el => {
        const size = parseInt(el.dataset.size) / 2 || elemSize / 2;
        const offsetX = (Math.random() * 2 - 1) * jitter;
        const offsetY = (Math.random() * 2 - 1) * jitter;

        let body = Bodies.circle(spawnX + offsetX, spawnY + offsetY, size, { restitution: 0.7 });
        World.add(world, body);
        bodies.push({ el, body, shape: "circle", size });
    });

    document.querySelectorAll(".square").forEach(el => {
        const size = parseInt(el.dataset.size) || elemSize;
        const offsetX = (Math.random() * 2 - 1) * jitter;
        const offsetY = (Math.random() * 2 - 1) * jitter;

        let body = Bodies.rectangle(spawnX + offsetX, spawnY + offsetY, size, size, { restitution: 0.7 });
        World.add(world, body);
        bodies.push({ el, body, shape: "square", size });
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

        for (let i = bodies.length - 1; i >= 0; i--) {
            const { el, body, shape, size } = bodies[i];
            const { x, y } = body.position;

            const boundsPadding = size + 10;
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
                    el.style.left = x - size + "px";
                    el.style.top = y - size + "px";
                } else if (shape === "square") {
                    el.style.left = x - size / 2 + "px";
                    el.style.top = y - size / 2 + "px";
                }
                el.style.transform = `rotate(${body.angle}rad)`;
            }
        }
    });
}