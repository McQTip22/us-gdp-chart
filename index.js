document.addEventListener('DOMContentLoaded', function() {
	const req = new XMLHttpRequest();
	req.open('get', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);

	req.send();
	req.onload = function() {
		const json = JSON.parse(req.responseText);
		let dataset = json.data;
		console.log(dataset);
	};
});
