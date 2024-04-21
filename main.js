import './style.css'

function canPlace(board, x, y, width, height) {
    // Check if a rectangle can be placed at (x, y) with given width and height.
    if (x + width > board.length || y + height > board[0].length) {
        return false;
    }
    for (let i = x; i < x + width; i++) {
        for (let j = y; j < y + height; j++) {
            if (board[i][j] !== 0) {
                return false;
            }
        }
    }
    return true;
}

function placeRectangle(board, x, y, width, height) {
    // Place a rectangle on the board at (x, y) with given width and height, all marked with '1'.
    for (let i = x; i < x + width; i++) {
        for (let j = y; j < y + height; j++) {
            board[i][j] = 1;
        }
    }
}

function rotateBoard180(board) {
    // Rotate the board 180 degrees.
    return board.slice().reverse().map(row => row.slice().reverse());
}

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function randomPlacement(board, width, height) {
    // Attempt to place a rectangle randomly on the board, marking it with '1'.
    let attempts = 0;
    while (attempts < 100) {  // Give up after 100 attempts to avoid infinite loops
        const tempBoard = rotateBoard180(board);  // Rotate board 180 degrees before each placement attempt
        const positions = [];
        for (let i = 0; i < tempBoard.length; i++) {
            for (let j = 0; j < tempBoard[0].length; j++) {
                positions.push([i, j]);
            }
        }
        shuffleArray(positions);
        const orientations = (width !== height) ? [[width, height], [height, width]] : [[width, height]];
        shuffleArray(orientations);

        for (const [x, y] of positions) {
            for (const [w, h] of orientations) {
                if (canPlace(tempBoard, x, y, w, h)) {
                    placeRectangle(tempBoard, x, y, w, h);
                    board.splice(0, board.length, ...tempBoard);  // Copy the updated state back to the original board
                    return true;
                }
            }
        }
        attempts++;
    }
    return false;
}

function simulatePlacement(times) {
    // Simulate placements and average results.
    const count = Array.from({ length: 5 }, () => Array.from({ length: 9 }, () => 0));

    for (let t = 0; t < times; t++) {
        const board = initializeBoard();
        for (const [width, height] of rectangles) {
            if (!randomPlacement(board, width, height)) {
                break;  // If placement failed, break the loop
            }
        }

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] > 0) {  // Only count non-blocked areas
                    count[i][j] += board[i][j];
                }
            }
        }
    }

    // Calculate averages
    const averageBoard = count.map(row => row.map(val => val / times));
    return averageBoard;
}

function checkAndCorrectResults() {
    const initialized = initializeBoard();
    let mismatch = false;

    for (let i = 0; i < initialized.length; i++) {
        for (let j = 0; j < initialized[0].length; j++) {
            if (initialized[i][j] === -1 && averageResults[i][j] !== 0.00) {
                mismatch = true;
                break;
            }
        }
        if (mismatch) {
            break;
        }
    }

    let correctedResults;
    if (mismatch) {
        correctedResults = rotateBoard180(averageResults);
    } else {
        correctedResults = averageResults;
    }

    return correctedResults;
}

function printBoard(board) {
    let max = 0;
    for (const [index, row] of board.entries()) {
        max < Math.max(...row) ? max = Math.max(...row) : undefined;
    }
    // Print the board.
    for (const [index, row] of board.entries()) {
        for (let x = 0; x < 9; x++) {
            document.querySelector(`[class="grid x${x} y${index}"]`).hasAttribute("btnselected") ?
                document.querySelector(`[class="grid x${x} y${index}"]`).innerText = "0%" :
                document.querySelector(`[class="grid x${x} y${index}"]`).innerText = (row[x] >= 0 ? `${(row[x] * 100).toFixed(1)}%` : "X");

            row[x] >= max ?
                document.querySelector(`[class="grid x${x} y${index}"]`).setAttribute("color", "target") :
                row[x] >= max - 0.05 ?
                    document.querySelector(`[class="grid x${x} y${index}"]`).setAttribute("color", "high") :
                    row[x] >= max - 0.1 ?
                        document.querySelector(`[class="grid x${x} y${index}"]`).setAttribute("color", "mid") :
                        row[x] >= max - 0.2 ?
                            document.querySelector(`[class="grid x${x} y${index}"]`).setAttribute("color", "low") :
                            document.querySelector(`[class="grid x${x} y${index}"]`).removeAttribute("color");
        }
    }
}

let map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function initializeBoard() {
    return JSON.parse(JSON.stringify(map));
}

const data = [
    [[3, 2], [1, 3], [2, 1]],
    [[4, 2], [2, 2], [1, 3]],
    [[3, 3], [1, 4], [2, 1]],
    [[3, 2], [1, 3], [2, 1]],
    [[4, 2], [2, 2], [1, 3]],
    [[3, 3], [1, 4], [2, 1]],
    [[2, 2], [1, 3], [2, 1]],
];
function generateRectangles(n, a, b, c) {
    const rectangle = [];
    for (let i = 0; i < a; i++) {
        rectangle.push(data[n - 1][0]);
    }
    for (let i = 0; i < b; i++) {
        rectangle.push(data[n - 1][1]);
    }
    for (let i = 0; i < c; i++) {
        rectangle.push(data[n - 1][2]);
    }
    return rectangle;
}














let n = "1";
let a = "1";
let b = "3";
let c = "5";
let defaultCount = [[1, 3, 5], [1, 2, 3], [1, 2, 4], [1, 3, 5], [1, 2, 3], [1, 2, 4], [2, 3, 6]];
let rectangles = generateRectangles(n, a, b, c);

let averageResults;


document.querySelector('#app').innerHTML = `
<div class="container">
    <h1>總決算計算器</h1>
    <div>
    箱數
    ${(function fun() {
        let html = "";
        for (let n2 = 1; n2 <= 7; n2++) {
            html += `<button class="n" data-num=${n2}>${n2}${n2 === 7 ? "+" : ""}</button>`
        }
        return html;
    })()}
    </div>
    <h3>剩餘道具</h3>
    <div class="row">
        <div class="itemTag">
            <span>1 獎</span>
            <span class="prize1">(n * n)</span>
        </div>
        ${(function fun() {
        let html = "";
        for (let n = 0; n <= 2; n++) {
            html += `<button class="a" data-num=${n}>${n}</button>`
        }
        return html;
    })()}
    </div>
    <div class="row">
        <div class="itemTag">
            <span>2 獎</span>
            <span class="prize2">(n * n)</span>
        </div>
        ${(function fun() {
        let html = "";
        for (let n = 0; n <= 3; n++) {
            html += `<button class="b" data-num=${n}>${n}</button>`
        }
        return html;
    })()}
        <br>
    </div>
    <div class="row">
        <div class="itemTag">
            <span>3 獎</span>
            <span class="prize3">(n * n)</span>
        </div>
            ${(function fun() {
        let html = "";
        for (let n = 0; n <= 6; n++) {
            html += `<button class="c" data-num=${n}>${n}</button>`
        }
        return html;
    })()}
    </div>
    <div class="btnContainer">
        <button class="print">print</button>
        <button class="reset"></button>
    </div>
    <div class="output">
    ${(function fun() {
        let html = "";
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 9; x++) {
                html += `<button class="grid x${x} y${y}" tabindex="0">0%</button>`;
            }
            html += `</br>`;
        }
        return html;
    })()}
    </div>
</div>
`

renderBtn();
for (let k = 0; k < 3; k++)
    document.querySelector(`.prize${k + 1}`).innerText = `(${data[n - 1][k][0]} x ${data[n - 1][k][1]})`;

document.querySelectorAll(".n").forEach(btn => btn.addEventListener("click", (e) => {
    n = e.target.dataset.num;
    a = defaultCount[n - 1][0].toString();
    b = defaultCount[n - 1][1].toString();
    c = defaultCount[n - 1][2].toString();

    for (let k = 0; k < 3; k++)
        document.querySelector(`.prize${k + 1}`).innerText = `(${data[n - 1][k][0]} x ${data[n - 1][k][1]})`;
    renderBtn();
}))
document.querySelectorAll(".a").forEach(btn => btn.addEventListener("click", (e) => {
    a = e.target.dataset.num;
    renderBtn();
}))
document.querySelectorAll(".b").forEach(btn => btn.addEventListener("click", (e) => {
    b = e.target.dataset.num;
    renderBtn();
}))
document.querySelectorAll(".c").forEach(btn => btn.addEventListener("click", (e) => {
    c = e.target.dataset.num;
    renderBtn();
}))

function renderBtn() {
    document.querySelectorAll(".n").forEach(btn => { btn.dataset.num === n ? btn.classList.add("selected") : btn.classList.remove("selected") });
    document.querySelectorAll(".a").forEach(btn => { btn.dataset.num === a ? btn.classList.add("selected") : btn.classList.remove("selected") });
    document.querySelectorAll(".b").forEach(btn => { btn.dataset.num === b ? btn.classList.add("selected") : btn.classList.remove("selected") });
    document.querySelectorAll(".c").forEach(btn => { btn.dataset.num === c ? btn.classList.add("selected") : btn.classList.remove("selected") });
}


let isProcessing = false;

const btn = document.querySelector(".print");
btn.innerText = "計算";
btn.addEventListener("click", (e) => {
    if (!isProcessing) {
        e.target.setAttribute("disable", "");
        isProcessing = true;

        rectangles = generateRectangles(n, a, b, c);
        averageResults = simulatePlacement(10000);
        printBoard(checkAndCorrectResults());

        setTimeout(() => {
            isProcessing = false;
            e.target.removeAttribute("disable", "");
        }, 500);
    }
});

document.querySelectorAll(".grid").forEach(grid => {
    grid.addEventListener("click", (e) => {
        if (!e.target.hasAttribute("btnSelected"))
            e.target.setAttribute("btnSelected", "");
        else
            e.target.removeAttribute("btnSelected", "");

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 9; x++) {
                map[y][x] = (document.querySelector(`[class="grid x${x} y${y}"]`).hasAttribute("btnSelected") ? -1 : 0);
            }
        }
    })
})

const btn2 = document.querySelector(".reset");
btn2.innerText = "盤面重置";
btn2.addEventListener("click", () => {
    map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 9; x++) {
            document.querySelector(`[class="grid x${x} y${y}"]`).removeAttribute("btnSelected", "");
            document.querySelector(`[class="grid x${x} y${y}"]`).removeAttribute("color", "");
            document.querySelector(`[class="grid x${x} y${y}"]`).innerText = "0.0%";
        }
    }
});
