  var videoCanvas = document.getElementById("video-chart");
  var videoChart = new Chart(videoCanvas, {
    type: 'line',
    data: {
      labels: ["20m", "18m", "16m", "14m", "12m", "10m", "8m", "6m", "4m", "2m", "now"],
      datasets: [{
        label: "28c904fc4a23523ea91cfc2bad6453a6e8eca5551b936c8929cbabe0480c9b11",
        backgroundColor: "rgba(38, 185, 154, 0.31)",
        borderColor: "rgba(38, 185, 154, 0.7)",
        pointBorderColor: "rgba(38, 185, 154, 0.7)",
        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointBorderWidth: 1,
        data: [60, 63, 2, 68, 99, 14, 36, 46, 84, 89, 59],
        fill: false
      }, {
        label: "aabd0570ae92f778913a8197b7788dc55fb5de283506b405224721760b124fbd",
        backgroundColor: "rgba(3, 88, 106, 0.3)",
        borderColor: "rgba(3, 88, 106, 0.70)",
        pointBorderColor: "rgba(3, 88, 106, 0.70)",
        pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(151,187,205,1)",
        pointBorderWidth: 1,
        data: [52, 57, 99, 56, 76, 37, 28, 92, 85, 79, 64],
        fill: false
      }]
    },
  });

  // Trending chart
  var trendingViewCanvas = document.getElementById("trending-view-chart");
  var trendingViewChart = new Chart(trendingViewCanvas, {
    type: 'line',
    data: {
      labels: ["Nov 7", "", "", "", "Nov 12", "", "", "", "Nov 17", "", "", "", "Nov 22", "", "", "", "Nov 27", "", "", "", "Dec 2"],
      datasets: [{
        borderWidth: 1,
        backgroundColor: "rgba(38, 185, 154, 0.31)",
        borderColor: "rgba(38, 185, 154, 0.7)",
        pointRadius: 0,
        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        data: [62, 61, 59, 100, 18, 37, 81, 53, 88, 9, 1, 97, 89, 59, 79, 52, 60, 94, 11, 35, 89],
        fill: false,
        lineTension: 0,
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes : [{
            gridLines: {
                display : false
            }
        }],
      }
    }
  });

  var trendingWatchCanvas = document.getElementById("trending-watchtime-chart");
  var trendingWatchChart = new Chart(trendingWatchCanvas, {
    type: 'line',
    data: {
      labels: ["Nov 7", "", "", "", "Nov 12", "", "", "", "Nov 17", "", "", "", "Nov 22", "", "", "", "Nov 27", "", "", "", "Dec 2"],
      datasets: [{
        borderWidth: 1,
        backgroundColor: "rgba(38, 185, 154, 0.31)",
        borderColor: "rgba(38, 185, 154, 0.7)",
        pointRadius: 0,
        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        data: [33, 59, 78, 89, 93, 38, 9, 97, 47, 97, 83, 29, 37, 31, 80, 92, 97, 3, 6, 59, 10],
        fill: false,
        lineTension: 0,
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes : [{
            gridLines: {
                display : false
            }
        }],
      }
    }
  });

  var trendingShareCanvas = document.getElementById("trending-share-chart");
  var trendingShareChart = new Chart(trendingShareCanvas, {
    type: 'line',
    data: {
      labels: ["Nov 7", "", "", "", "Nov 12", "", "", "", "Nov 17", "", "", "", "Nov 22", "", "", "", "Nov 27", "", "", "", "Dec 2"],
      datasets: [{
        borderWidth: 1,
        backgroundColor: "rgba(38, 185, 154, 0.31)",
        borderColor: "rgba(38, 185, 154, 0.7)",
        pointRadius: 0,
        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        data: [81, 45, 90, 72, 10, 14, 22, 87, 98, 98, 65, 37, 37, 11, 42, 63, 56, 97, 1, 20, 47],
        fill: false,
        lineTension: 0,
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes : [{
            gridLines: {
                display : false
            }
        }],
      }
    }
  });

  var ws = new WebSocket("ws://localhost:8080/ws");

  ws.onopen = function() {
    console.log("Ahrrr, I'm connected")
  }


  ws.onmessage = function(event) {
    console.log(event);
    var data = JSON.parse(event.data);
    console.log(data)
    document.getElementById("current-visitor").innerHTML = data.UserView.Current

    //Trending video
    var content = "";
    for (i = 0; i < data.TrendingVideos.length; i++) {
          content += "<tr><th>"+(i+1)+"</th><th>"+data.TrendingVideos[i].VideoId+"</th><th>"+data.TrendingVideos[i].Count+"</th></tr>";
    }
    document.getElementById('list-video').innerHTML = content;
  }



  document.addEventListener("unload", function() {
    if (ws) {
      ws.close();
    }
  });
