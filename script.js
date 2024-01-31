let w = 60;
let stepsX, stepsY;
let currentStep = 0;
let drawnObjects = []; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    stepsX = width / w;
    stepsY = height / w;
    frameRate(20);

    for (let i = 0; i < stepsX * stepsY; i++) {
        drawnObjects.push({ drawn: false });
    }
}

function draw() {
    let totalSteps = stepsX * stepsY;
    let easedStep = easeInQuad(min(frameCount, 40), 0, totalSteps, 40);

    for (let i = 0; i < easedStep; i++) {
        if (!drawnObjects[i].drawn) {
            let palette = [color(0), color(255)];
            let x = (i % stepsX) * w;
            let y = Math.floor(i / stepsX) * w;

            let squareColor = palette[1];
            let archColor = palette[0];

            noStroke();
            fill(squareColor);
            square(x, y, w);

            stroke(archColor);
            strokeWeight(w / 2);
            strokeCap(SQUARE);
            push();
            translate(x + w / 2, y + w / 2);
            let offset = int(random(4));
            rotate((offset * PI) / 2);
            arc(-w / 2, -w / 2, w * 2 - w / 2, w * 2 - w / 2, 0, PI / 2);
            pop();

            drawnObjects[i].drawn = true;
        }
    }
}

function easeInQuad(t, b, c, d) {
    t /= d;
    return c*t*t + b;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
