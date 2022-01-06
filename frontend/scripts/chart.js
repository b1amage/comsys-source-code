const createChart = (res, command) => {
  var xValues = [];
  var yValues = [];

  var unit;
  var weatherFactor;

  if (command === "temp") {
    unit = "°C";
    weatherFactor = "temperature";
  } else if (command === "humid") {
    unit = "%";
    weatherFactor = "humidity";
  } else if (command === "pressure") {
    unit = "mp";
    weatherFactor = "pressure";
  }

  res.forEach((obj) => {
    xValues.push(obj.data);
    yValues.push(obj[command]);
  });

  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const steps = (maxY - minY) / 5;

  chartField.innerHTML = `<canvas id="weatherChart"></canvas>`;

  const chart = new Chart("weatherChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(255,255,255,10)",
          borderColor: "rgba(0,0,0,2)",
          data: yValues,
          pointRadius: 5,
        },
      ],
    },
    options: {
      title: {
        display: true,
        position: "top",
        fontColor: "rgba(255,255,255)",
        text: "Changes in air " + weatherFactor,
        fontSize: 25,
      },
      maintainAspectRatio: false,
      responsive: true,
      legend: { display: false },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel + unit;
          },
        },
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontSize: 15,
              fontColor: "rgba(255,255,255)",
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
              fontColor: "rgba(255,255,255)",
            },

            gridLines: { color: "black" },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: minY,
              stepSize: steps,
              max: maxY,
              fontSize: 15,
              fontColor: "rgba(255,255,255)",
            },

            scaleLabel: {
              display: true,
              labelString:
                weatherFactor[0].toUpperCase() +
                weatherFactor.slice(1) +
                `(${unit})`,
              fontColor: "rgba(255,255,255)",
            },

            gridLines: { color: "black" },
          },
        ],
      },
    },
    plugins: [
      {
        beforeDraw: function (context) {
          var chartHeight = context.chart.height;
          var chartWidth = context.chart.width;
          if (chartWidth <= 500) {
            context.scales["y-axis-0"].options.ticks.fontSize =
              (chartHeight * 2.25) / 100;
            context.scales["y-axis-0"].options.scaleLabel.fontSize =
              (chartHeight * 2.5) / 100;
            context.scales["x-axis-0"].options.ticks.fontSize =
              (chartWidth * 4.5) / 100;
            context.scales["x-axis-0"].options.scaleLabel.fontSize =
              (chartWidth * 5.5) / 100;
          } else if (chartWidth > 767 && chartWidth <= 1024) {
            context.scales["y-axis-0"].options.ticks.fontSize =
              (chartHeight * 2.25) / 100;
            context.scales["y-axis-0"].options.scaleLabel.fontSize =
              (chartHeight * 2.5) / 100;
            context.scales["x-axis-0"].options.ticks.fontSize =
              (chartWidth * 1.75) / 100;
            context.scales["x-axis-0"].options.scaleLabel.fontSize =
              (chartWidth * 2.5) / 100;
          } else if (chartWidth > 1024 && chartWidth <= 1366) {
            context.scales["y-axis-0"].options.ticks.fontSize =
              (chartHeight * 1.25) / 100;
            context.scales["y-axis-0"].options.scaleLabel.fontSize =
              (chartHeight * 3) / 100;
            context.scales["x-axis-0"].options.ticks.fontSize =
              (chartWidth * 2.5) / 100;
            context.scales["x-axis-0"].options.scaleLabel.fontSize =
              (chartWidth * 2) / 100;
          } else if (chartWidth >= 1366) {
            context.scales["y-axis-0"].options.ticks.fontSize =
              (chartHeight * 2.5) / 100;
            context.scales["y-axis-0"].options.scaleLabel.fontSize =
              (chartHeight * 2.5) / 100;
            context.scales["x-axis-0"].options.ticks.fontSize =
              (chartWidth * 1.25) / 100;
            context.scales["x-axis-0"].options.scaleLabel.fontSize =
              (chartWidth * 1.5) / 100;
          }
        },
      },
    ],
  });

  return chart;
};
