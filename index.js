function year(date) {
	let dateArr = date.split('-');
	return dateArr[0];
}

function month(date) {
	let dateArr = date.split('-');
	return dateArr[1];
}

// xPlace;

//connect to json file
document.addEventListener('DOMContentLoaded', function() {
	const req = new XMLHttpRequest();
	req.open('get', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);

	req.send();

	req.onload = function() {
		let json = JSON.parse(req.responseText);
		let dataset = json.data;

		let w = 1000;
		let h = 600;
		let padding = 150;

		let xMin = d3.min(dataset, function(d) {
			return year(d[0]);
		});
		let xMax = d3.max(dataset, function(d) {
			return year(d[0]);
		});

		let svg = d3.select('.chart').append('svg').attr('width', w).attr('height', h);

		// Chart Title
		svg
			.append('text')
			.attr('x', w / 2)
			.attr('y', 100)
			.attr('text-anchor', 'middle')
			.attr('font-size', '1em')
			.style('text-decoration', 'underline')
			.text('US GDP Data');

		// y label
		svg
			.append('text')
			.attr('x', padding / 2)
			.attr('y', h / 2)
			.attr('dy', '1.5em')
			.style('text-anchor', 'middle')
			.text('GDP');

		//x label
		svg
			.append('text')
			.attr('x', w / 2)
			.attr('y', h - 75)
			.attr('dy', '1em')
			.style('text-anchor', 'middle')
			.text('Year');

		let barPlace = (xMax - xMin) / dataset.length;
		let barWidth = padding * 2 / dataset.length;
		let xScale = d3.scaleLinear().domain([ xMin, xMax ]).range([ padding, w - padding ]);
		let yScale = d3.scaleLinear().domain([ 0, d3.max(dataset, (d) => d[1]) ]).range([ h - padding, padding ]);

		// define axis
		// x
		svg
			.append('g')
			.attr('transform', 'translate(0,' + (h - padding) + ')')
			.attr('id', 'x-axis')
			.call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

		//y
		svg
			.append('g')
			.attr('transform', 'translate(' + padding + ',' + 0 + ')')
			.attr('id', 'y-axis')
			.call(d3.axisLeft(yScale));

		// Bars
		svg
			.selectAll('rect')
			.data(dataset)
			.enter()
			.append('rect')
			.attr('x', (d, i) => {
				return xScale(i * barPlace + parseInt(xMin));
			})
			.attr('y', (d, i) => {
				return yScale(d[1]);
			})
			.attr('class', 'bar')
			.attr('width', barWidth * 2)
			.attr('height', (d, i) => {
				return h - padding - yScale(d[1]);
			})
			.attr('data-date', function(d, i) {
				return d[0];
			})
			.attr('data-gdp', function(d) {
				return d[1];
			})
			//tooltip
			.append('title')
			.text(function(d, i) {
				return (i = `${d[0]}: $${d[1]}billion`);
			});
	};
});
