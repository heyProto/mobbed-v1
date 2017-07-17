function groupBy(data, column) {
  let grouped_data = {};
  switch(typeof column) {
    case "string":
      data.forEach(datum => {
        if(grouped_data[datum[column]]) {
          grouped_data[datum[column]].push(datum);
        } else {
          grouped_data[datum[column]] = [datum];
        }
      });
      break;
    case "function":
      data.forEach(datum => {
        let key = column(datum);
        if(grouped_data[key]) {
          grouped_data[key].push(datum);
        } else {
          grouped_data[key] = [datum];
        }
      });
      break;
  }
  return grouped_data;
}

module.exports = {
  groupBy : groupBy
}