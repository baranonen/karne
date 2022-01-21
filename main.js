var xValues = []
var yValues = []

function createchart() {
	document.getElementById("chart").style.display = "unset"

	xValues = []
	yValues = []

	yValues.push(document.getElementById("firstpoint").value)
	yValues.push(document.getElementById("secondpoint").value)
	yValues.push(document.getElementById("thirdpoint").value)
	yValues.push(document.getElementById("fourthpoint").value)
	yValues.push(document.getElementById("fifthpoint").value)

	xValues.push(document.getElementById("firstdate").value)
	xValues.push(document.getElementById("seconddate").value)
	xValues.push(document.getElementById("thirddate").value)
	xValues.push(document.getElementById("fourthdate").value)
	xValues.push(document.getElementById("fifthdate").value)

	Chart.plugins.register({
		afterRender: function(c) {
			console.log("afterRender called");
			var ctx = c.chart.ctx;
			ctx.save();
			// This line is apparently essential to getting the
			// fill to go behind the drawn graph, not on top of it.
			// Technique is taken from:
			// https://stackoverflow.com/a/50126796/165164
			ctx.globalCompositeOperation = 'destination-over';
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, c.chart.width, c.chart.height);
			ctx.restore();
		}
	});

	new Chart("chart", {
		type: "line",
		data: {
			labels: xValues,
			datasets: [{
				fill: false,
				lineTension: 0,
				backgroundColor: "rgb(255,255,255)",
				borderColor: "rgb(227, 89, 40)",
				data: yValues
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Karne - ' + document.getElementById("studentname").value
			},
			legend: { display: false },
			layout: {
				padding: 20
			},
			animation: {
				onComplete: save
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Puan'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Tarih'
					}
				}]
			}
		}
	});
}

function save() {
	document.getElementById("chart").toBlob(function(blob) {
		saveAs(blob, document.getElementById("studentname").value + " Karne.png");
	})
}