
const body = document.querySelector('body');
const locationCard = document.querySelector('#location');
const greetingCard = document.getElementById("greeting");

function displayCard (card) {
	locationCard.style.display = 'none';
	greetingCard.style.display = 'none';
	card.style.display = 'block'
}

function getStopByName (stop_name) {
	return linesPerStop[stop_name];
}

function randomStop () {
	// this is more likely to pick stations on multiple lines
	const index = Math.floor(Math.random() * stopsByLineWithColour.length);
	return linesPerStop[stopsByLineWithColour[index][0]];
}

function showStop (stop) {
	const stopNameElem = document.querySelector('#location .stop_name');
	const linesList = document.querySelector('#location .lines');
	const mapLink = document.querySelector('#location .directions a');
	const miniStartButton = document.querySelector("#location .start-adventure");

	body.style.backgroundColor = stop.lines[0].hex;
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

	history.pushState(undefined, undefined, '?s=' + stop.stop_name);
}

function suggest () {
	showStop(randomStop());
}

const urlParams = function (window_object = window) {
  var params = {};
  var match;
  var pl = /\+/g;
  var search = /([^&=]+)=?([^&]*)/g;
  var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
  var query = window_object.location.search.substring(1);
  while((match = search.exec(query))) {
    params[decode(match[1])] = decode(match[2]);
  }
  return params;
}();

const startingStop = getStopByName(urlParams.s);

if (startingStop) {
	showStop(startingStop);
} else {
	displayCard(greetingCard);
}

[...document.querySelectorAll(".start-adventure")].forEach(function (button) {
  button.addEventListener('click', suggest);
});
