let w = 20

function setup() {
    createCanvas(windowWidth, windowHeight)
    noLoop()

    const input = document.querySelector('input')
    input.addEventListener('change', handleSizeChange)
}

function draw() {
    background(0)

    let palette = [
        color(0), color(255), color(7, 33, 95), color(61, 109, 147),
        color(81, 53, 26), color(115, 192, 171), color(143, 120, 89),
        color(163, 219, 255), color(175, 17, 34), color(197, 133, 187),
        color(228, 188, 101), color(236, 76, 91), color(243, 241, 194)
    ]

    drawGrid(palette, w)
}

function drawGrid(palette, w) {
    for (let x = 0; x < width; x += w) {
        for (let y = 0; y < height; y += w) {
            let shuffledPalette = shuffle([...palette])
            let squareColor = shuffledPalette[0]
            let archColor = shuffledPalette[1]

            noStroke()
            fill(squareColor)
            square(x, y, w)

            noFill()
            stroke(archColor)
            strokeWeight(w / 2)
            strokeCap(SQUARE)
            push()
            translate(x + w / 2, y + w / 2)
            let offset = int(random(4))
            rotate((offset * PI) / 2)
            arc(-w / 2, -w / 2, w * 2 - w / 2, w * 2 - w / 2, 0, PI / 2)
            pop()
        }
    }
}

function handleSizeChange(e) {
    const size = parseInt(e.target.value)
    w = size < 10 ? 10 : size
    redraw()
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}
