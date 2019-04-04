
const locationCard = document.querySelector('#location');
const greetingCard = document.getElementById("greeting");

function displayCard (card) {
	locationCard.style.display = 'none';
	greetingCard.style.display = 'none';
	card.style.display = 'block'
}

function randomStop () {
	// this is more likely to pick stations on multiple lines
	const index = Math.floor(Math.random() * stopsByLineWithColour.length);
	return linesPerStop[stopsByLineWithColour[index][0]];
}

function suggest () {
	const stopNameElem = document.querySelector('#location .stop_name');
	const linesList = document.querySelector('#location .lines');
	const mapLink = document.querySelector('#location .directions a');
	const miniStartButton = document.querySelector("#location .start-adventure");

	const stop = randomStop();

	locationCard.style.backgroundColor = stop.lines[0].hex;
	miniStartButton.style.color = stop.lines[0].hex;
	stopNameElem.innerText = stop.stop_name;
	linesList.innerHTML = "";
	stop.lines.forEach(function (line) {
		const li = document.createElement('li');
		li.innerText = line.line_name;
		linesList.appendChild(li);
	});
	mapLink.href = 'https://www.google.com/maps/search/' + stop.stop_name;

	displayCard(locationCard);
}

displayCard(greetingCard);

[...document.querySelectorAll(".start-adventure")].forEach(function (button) {
  button.addEventListener('click', suggest);
});



