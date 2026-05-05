var arrivalsLine = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": "container",
  "height": 350,

  "data": {
    "values": [
      {"year": "2019", "visitors": 9430000},
      {"year": "2020", "visitors": 1800000},
      {"year": "2021", "visitors": 250000},
      {"year": "2022", "visitors": 2100000},
      {"year": "2023", "visitors": 6600000},
      {"year": "2024", "visitors": 7800000},
      {"year": "2025", "visitors": 8500000}
    ]
  },

  "mark": {
    "type": "line",
    "point": true,
    "strokeWidth": 3
  },

  "encoding": {
    "x": {
      "field": "year",
      "type": "ordinal",
      "title": "Year"
    },
    "y": {
      "field": "visitors",
      "type": "quantitative",
      "title": "Visitor arrivals",
      "axis": {
        "format": ","
      }
    },
    "tooltip": [
      {"field": "year", "type": "ordinal", "title": "Year"},
      {"field": "visitors", "type": "quantitative", "title": "Visitors", "format": ","}
    ]
  }
};

vegaEmbed("#arrivals_line", arrivalsLine, {"actions": false});