addJSFile('https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js', () => {
    globalSnowLoaded = true
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 64,
            },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.8,
                "random": true
            },
            "size": {
                "value": 4,
                "random": true
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "speed": 8,
                "direction": "bottom",
                "random": true,
                "straight": false,
                "out_mode": "out",
            }
        }
    })
})