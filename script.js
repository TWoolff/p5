let w = 60;
let stepsX, stepsY;
let palette;
let backgroundColor;
let totalAnimationFrames = 100;
let drawing = true;
let isSequenceComplete = false;
let drawnObjects = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    backgroundColor = color(255, 255, 255);
    palette = [color(0), color(255)]
    stepsX = width / w;
    stepsY = height / w;
    frameRate(60)

    for (let i = 0; i < stepsX * stepsY; i++) {
        drawnObjects.push({ drawn: false });
    }
}

function draw() {
    if (isSequenceComplete) return;

    let totalSteps = stepsX * stepsY;
    let currentFrame = frameCount % totalAnimationFrames;
    let easedStep;

    if (currentFrame < totalAnimationFrames / 2) {
        drawing = true;
        easedStep = easeInQuad(currentFrame, 0, totalSteps, totalAnimationFrames / 2);
    } else {
        drawing = false;
        easedStep = easeInQuad(totalAnimationFrames - currentFrame, 0, totalSteps, totalAnimationFrames / 2);
    }

    for (let i = 0; i < totalSteps; i++) {
        let x = (i % stepsX) * w;
        let y = Math.floor(i / stepsX) * w;

        if (drawing && !drawnObjects[i].drawn && i < easedStep) {
            drawSquareAndArch(x, y, palette[1], palette[0]);
            drawnObjects[i].drawn = true;
        } else if (!drawing && drawnObjects[i].drawn && i >= easedStep - 1) {
            drawSquareAndArch(x, y, backgroundColor, backgroundColor);
            drawnObjects[i].drawn = false;
        }
    }

    if (currentFrame >= totalAnimationFrames - 1) {
        isSequenceComplete = true;
        noLoop();
    }
}

function drawSquareAndArch(x, y, squareColor, archColor) {
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
}

function easeInQuad(t, b, c, d) {
    t /= d;
    return c * t * t + b;
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
