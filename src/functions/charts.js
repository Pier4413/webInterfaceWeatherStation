function convertToHexa(value) {
  let str = Number(value).toString(16);
  return str.length == 1 ? "0" + str : str;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function calculateColor() {
  let red = convertToHexa(Math.floor(randomIntFromInterval(1,255)));
  let green = convertToHexa(Math.floor(randomIntFromInterval(1,255)));
  let blue = convertToHexa(Math.floor(randomIntFromInterval(1,255)));
  let str = "#"+red+green+blue
  return str;
}

function createChart(data, trad, titleText, conversionFunction, ...keys) {

  if(!Array.isArray(data)) {
    throw "Can't create charts data are not an array like"
  }

  let datasets = [];
  let labels = [];

  for(let k in keys) {
    let color = calculateColor();
    let obj = {
      label: trad(keys[k], 1),
      data: [],
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      pointRadius: 2
    };

    for(let d in data) {
      if(k == 0) {
        let date = new Date(data[d]["updatedAt"]);
        labels.push(date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()+", "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
      }
      if(conversionFunction!=null) {
        obj.data.push(conversionFunction(data[d][keys[k]]));
      } else {
        obj.data.push(data[d][keys[k]]);
      }
    }

    datasets.push(obj);
  }

  const planetChartData = {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        title: {
            display: true,
            text: trad(titleText, keys.length)
        }
      }
    }
  };

  return planetChartData;
}


export { createChart }