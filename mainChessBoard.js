let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

let w; // = width / 3;
let h; // = height / 3;

let ai = "X";
let human = "O";
let currentPlayer = human;

function setup() {
	createCanvas(400, 400);
	w = width / 3;
	h = height / 3;
	//bestMove(); //Máy đánh trước
}

let turnCount = 0;

function mousePressed() {
	if (currentPlayer == human) {
		// Lượt người chơi
		let i = floor(mouseX / w);
		let j = floor(mouseY / h);
		// Nếu click vào ô cờ trống
		if (board[i][j] == "") {
			board[i][j] = human;
			//lượt máy
			currentPlayer = ai;
			bestMove();
		}
	}
	turnCount += 1;
}

function draw() {
	background(255);
	strokeWeight(4);
	if (turnCount % 2 == 0) {
		stroke("#d00");
	} else {
		stroke("#00f");
	}

	line(w, 0, w, height);
	line(w * 2, 0, w * 2, height);
	line(0, h, width, h);
	line(0, h * 2, width, h * 2);

	for (let j = 0; j < 3; j++) {
		for (let i = 0; i < 3; i++) {
			let x = w * i + w / 2;
			let y = h * j + h / 2;
			let spot = board[i][j];
			textSize(32);
			let r = w / 4;
			if (spot == human) {
				noFill();
				stroke("#d00");
				ellipse(x, y, r * 2.5);
			} else if (spot == ai) {
				stroke("#00f");
				strokeWeight(5);
				line(x - r, y - r, x + r, y + r);
				line(x + r, y - r, x - r, y + r);
			}
		}
	}

	let result = checkWinner();
	if (result != null) {
		noLoop();
		let resultP = createP("");
		resultP.id("resultP");
		resultP.style("font-size", "32pt");
		if (result == "tie") {
			resultP.html("Tie!");
		} else {
			resultP.html(`${result} wins!`);
		}
	}
}
