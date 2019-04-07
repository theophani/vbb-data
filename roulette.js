
const body = document.querySelector('body');
const locationCard = document.getElementById('location');
const greetingCard = document.getElementById("greeting");

function displayCard (card, hex, inverse) {
	locationCard.style.display = 'none';
	greetingCard.style.display = 'none';
	card.style.display = 'block'
	body.style.backgroundColor = hex;
	body.className = inverse ? "inverse" : "";
}

function getStopByName (stop_name) {
	return linesPerStop[stop_name];
}

function randomIndex (myArray) {
	return Math.floor(Math.random() * myArray.length);
}

function randomStop () {
	// this is more likely to pick stations on multiple lines
	const index = randomIndex(stopsByLineWithColour);
	return linesPerStop[stopsByLineWithColour[index][0]];
}

function niceDisplayName (stop_name) {

	// This is not an empty string!
	// It contains a zero-width space
	const zws = "​";

	const replacements = [
		[ 'Babelsberg/Schulstr.' , 'Babelsberg/' + zws + 'Schulstr.' ],
		[ 'Kochstr./Checkpoint'  , 'Kochstr./' + zws + 'Checkpoint'  ],
		[ 'Naturkundemuseum'     , 'Naturkunde' + zws + 'museum'     ],
		[ 'Schwartzkopffstr.'    , 'Schwartzkopffstr'                ],
		[ 'Mierendorffplatz'     , 'Mierendorff' + zws + 'platz'     ],
		[ 'Breitenbachplatz'     , 'Breitenbach' + zws + 'platz'     ],
		[ 'Hohenzollerndamm'     , 'Hohenzollern' + zws + 'damm'     ],
		[ 'Hohenzollernplatz'    , 'Hohenzollern' + zws + 'platz'    ],
		[ 'Hohenschönhausen'     , 'Hohenschön' + zws + 'hausen'     ],
		[ 'Baumschulenweg'       , 'Baumschulen' + zws + 'weg'       ],
		[ ' (Berlin)'            , '']
	];

	replacements.forEach (function (replacement) {
		stop_name = stop_name.replace(replacement[0], replacement[1]);
	});

	return stop_name;
}

function showStop (stop) {
	const stopNameElem = document.querySelector('#location .stop_name');
	const linesList = document.querySelector('#location .lines');
	const mapLink = document.querySelector('#location .directions');
	const colorLine = stop.lines[randomIndex(stop.lines)];

	stopNameElem.innerText = niceDisplayName(stop.stop_name);
	linesList.innerHTML = "";
	stop.lines.forEach(function (line) {
		const li = document.createElement('li');
		li.innerText = line.line_name;
		linesList.appendChild(li);
	});
	mapLink.href = 'https://www.google.com/maps/search/' + stop.stop_name;

	displayCard(locationCard, colorLine.hex, colorLine.inverse);
}

function suggest () {
	const stop = randomStop();
	history.pushState({ stop }, undefined, '?s=' + encodeURIComponent(stop.stop_name));
	showStop(stop);
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

function showStopFromHistory (stop) {
	if (stop) {
		showStop(stop);
	} else {
		displayCard(greetingCard, '#F0CA00');
	}
}

window.addEventListener('popstate', function (evt) {
	showStopFromHistory(evt.state && evt.state.stop);
});

[...document.querySelectorAll('.start-adventure')].forEach(function (button) {
	button.addEventListener('click', suggest);
});

const startingStop = getStopByName(urlParams.s);
history.replaceState({ stop: startingStop }, undefined);
showStopFromHistory(startingStop);

