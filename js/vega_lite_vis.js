function embedChart(id, title) {
  const placeholderSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 300,

    "data": {
      "values": [
        {"year": "2019", "value": 100},
        {"year": "2020", "value": 22},
        {"year": "2021", "value": 8},
        {"year": "2022", "value": 35},
        {"year": "2023", "value": 70},
        {"year": "2024", "value": 88},
        {"year": "2025", "value": 94}
      ]
    },

    "title": {
      "text": title,
      "anchor": "start",
      "fontSize": 14,
      "fontWeight": "normal",
      "color": "#5f6f86"
    },

    "mark": {
      "type": "line",
      "point": true,
      "strokeWidth": 3,
      "color": "#2563eb"
    },

    "encoding": {
      "x": {
        "field": "year",
        "type": "ordinal",
        "title": null
      },
      "y": {
        "field": "value",
        "type": "quantitative",
        "title": null
      },
      "tooltip": [
        {"field": "year", "type": "ordinal", "title": "Year"},
        {"field": "value", "type": "quantitative", "title": "Value"}
      ]
    },

    "config": {
      "view": {
        "stroke": null
      },
      "axis": {
        "labelFont": "Inter",
        "titleFont": "Inter",
        "gridColor": "#e5edf5",
        "domainColor": "#cbd5e1",
        "tickColor": "#cbd5e1"
      }
    }
  };

  vegaEmbed(id, placeholderSpec, {"actions": false});
}

var arrivalsTimeline = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 410,

  "data": {
    "url": "data/arrivals_by_country.csv"
  },

  "transform": [
    {
      "filter": "datum.year >= 1991 && datum.year <= 2025 && isValid(datum.arrivals) && datum.country == 'Total (Country of stay/residence)'"
    },
    {
      "calculate": "toNumber(datum.year)",
      "as": "year_num"
    },
    {
      "aggregate": [
        {
          "op": "sum",
          "field": "arrivals",
          "as": "total_arrivals"
        }
      ],
      "groupby": ["year_num"]
    }
  ],

  "layer": [
    {
      "mark": {
        "type": "line",
        "strokeWidth": 4,
        "color": "#2563eb"
      },
      "encoding": {
        "x": {
          "field": "year_num",
          "type": "quantitative",
          "title": null,
          "scale": {
            "domain": [1991, 2025]
          },
          "axis": {
            "format": "d",
            "tickCount": 9,
            "labelAngle": 0
          }
        },
        "y": {
          "field": "total_arrivals",
          "type": "quantitative",
          "title": "International visitor arrivals",
          "axis": {
            "format": "~s"
          }
        },
        "tooltip": [
          {
            "field": "year_num",
            "type": "quantitative",
            "title": "Year",
            "format": "d"
          },
          {
            "field": "total_arrivals",
            "type": "quantitative",
            "title": "Arrivals",
            "format": ","
          }
        ]
      }
    },

    {
      "mark": {
        "type": "point",
        "filled": true,
        "size": 55,
        "color": "#2563eb",
        "opacity": 0.85
      },
      "encoding": {
        "x": {
          "field": "year_num",
          "type": "quantitative"
        },
        "y": {
          "field": "total_arrivals",
          "type": "quantitative"
        },
        "tooltip": [
          {
            "field": "year_num",
            "type": "quantitative",
            "title": "Year",
            "format": "d"
          },
          {
            "field": "total_arrivals",
            "type": "quantitative",
            "title": "Arrivals",
            "format": ","
          }
        ]
      }
    },

    {
      "data": {
        "values": [
          {
            "year_num": 2019,
            "total_arrivals": 9460600,
            "label": "2019 peak before border closures"
          },
          {
            "year_num": 2021,
            "total_arrivals": 245340,
            "label": "2021 low point"
          },
          {
            "year_num": 2025,
            "total_arrivals": 8937390,
            "label": "2025 recovered to 94.4% of 2019"
          }
        ]
      },
      "mark": {
        "type": "point",
        "filled": true,
        "size": 150,
        "color": "#f97316",
        "stroke": "white",
        "strokeWidth": 1.5
      },
      "encoding": {
        "x": {
          "field": "year_num",
          "type": "quantitative"
        },
        "y": {
          "field": "total_arrivals",
          "type": "quantitative"
        },
        "tooltip": [
          {
            "field": "label",
            "type": "nominal",
            "title": "Annotation"
          }
        ]
      }
    },

    {
      "data": {
        "values": [
          {
            "year_num": 2019,
            "total_arrivals": 9460600,
            "label": "2019 peak before border closures"
          },
          {
            "year_num": 2021,
            "total_arrivals": 245340,
            "label": "2021 low point"
          },
          {
            "year_num": 2025,
            "total_arrivals": 8937390,
            "label": "2025 recovered to 94.4% of 2019"
          }
        ]
      },
      "mark": {
        "type": "text",
        "align": "left",
        "baseline": "middle",
        "dx": 10,
        "dy": -14,
        "font": "Inter",
        "fontSize": 12,
        "fontWeight": "700",
        "color": "#172033"
      },
      "encoding": {
        "x": {
          "field": "year_num",
          "type": "quantitative"
        },
        "y": {
          "field": "total_arrivals",
          "type": "quantitative"
        },
        "text": {
          "field": "label",
          "type": "nominal"
        }
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "gridColor": "#e5edf5",
      "domainColor": "#cbd5e1",
      "tickColor": "#cbd5e1"
    }
  }
};

vegaEmbed("#chart_arrivals_timeline", arrivalsTimeline, {"actions": false});
var purposeArea = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 380,

  "data": {
    "url": "data/arrivals_by_purpose.csv"
  },

  "transform": [
    {
      "filter": "datum.year >= 1991 && datum.year <= 2025 && isValid(datum.arrivals) && datum.purpose != 'Total (Reason for Journey)'"
    },
    {
      "aggregate": [
        {
          "op": "sum",
          "field": "arrivals",
          "as": "total_arrivals"
        }
      ],
      "groupby": ["year", "purpose"]
    },
    {
      "joinaggregate": [
        {
          "op": "sum",
          "field": "total_arrivals",
          "as": "year_total"
        }
      ],
      "groupby": ["year"]
    },
    {
      "calculate": "datum.total_arrivals / datum.year_total",
      "as": "share"
    }
  ],

  "mark": {
    "type": "area",
    "line": {
      "color": "white",
      "strokeWidth": 0.6
    }
  },

  "encoding": {
    "x": {
      "field": "year",
      "type": "ordinal",
      "title": null,
      "axis": {
        "labelAngle": 0,
        "labelOverlap": "greedy"
      }
    },
    "y": {
      "field": "share",
      "type": "quantitative",
      "title": "Share of arrivals",
      "axis": {
        "format": "%"
      },
      "stack": "normalize"
    },
    "color": {
      "field": "purpose",
      "type": "nominal",
      "title": "Purpose of visit",
      "scale": {
        "scheme": "tableau10"
      },
      "legend": {
        "orient": "bottom",
        "columns": 3,
        "labelLimit": 180
      }
    },
    "tooltip": [
      {
        "field": "year",
        "type": "ordinal",
        "title": "Year"
      },
      {
        "field": "purpose",
        "type": "nominal",
        "title": "Purpose"
      },
      {
        "field": "total_arrivals",
        "type": "quantitative",
        "title": "Arrivals",
        "format": ","
      },
      {
        "field": "share",
        "type": "quantitative",
        "title": "Share",
        "format": ".1%"
      }
    ]
  },

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "gridColor": "#e5edf5",
      "domainColor": "#cbd5e1",
      "tickColor": "#cbd5e1"
    },
    "legend": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033"
    }
  }
};

vegaEmbed("#chart_purpose_area", purposeArea, {"actions": false});
var worldMap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 460,

  "layer": [
    {
      "data": {
        "url": "https://vega.github.io/vega-datasets/data/world-110m.json",
        "format": {
          "type": "topojson",
          "feature": "countries"
        }
      },
      "projection": {
        "type": "equalEarth"
      },
      "mark": {
        "type": "geoshape",
        "fill": "#e7be64",
        "stroke": "#ffffff",
        "strokeWidth": 0.4
      }
    },

    {
      "data": {
        "url": "https://vega.github.io/vega-datasets/data/world-110m.json",
        "format": {
          "type": "topojson",
          "feature": "countries"
        }
      },
      "transform": [
        {
          "lookup": "id",
          "from": {
            "data": {
              "url": "data/country_arrivals_2025_map.csv"
            },
            "key": "id",
            "fields": ["country", "total_arrivals"]
          }
        },
        {
          "filter": "isValid(datum.total_arrivals)"
        }
      ],
      "projection": {
        "type": "equalEarth"
      },
      "mark": {
        "type": "geoshape",
        "stroke": "#ffffff",
        "strokeWidth": 0.5
      },
      "encoding": {
        "color": {
          "field": "total_arrivals",
          "type": "quantitative",
          "title": "Visitor arrivals, 2025",
          "scale": {
            "scheme": ["#9ecae1", "#08519c"]
          },
          "legend": {
            "orient": "bottom",
            "format": "~s"
          }
        },
        "tooltip": [
          {
            "field": "country",
            "type": "nominal",
            "title": "Country"
          },
          {
            "field": "total_arrivals",
            "type": "quantitative",
            "title": "Arrivals in 2025",
            "format": ","
          }
        ]
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },
    "legend": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033"
    }
  }
};

vegaEmbed("#chart_world_map", worldMap, {"actions": false});
var topCountries = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 360,

  "params": [
    {
      "name": "selected_year",
      "value": 2025,
      "bind": {
        "input": "select",
        "options": [2019, 2020, 2021, 2024, 2025],
        "name": "Select year: "
      }
    }
  ],

  "data": {
    "url": "data/top10_source_countries_by_year.csv"
  },

  "transform": [
    {
      "filter": "datum.year == selected_year"
    }
  ],

  "layer": [
    {
      "mark": {
        "type": "bar",
        "cornerRadiusEnd": 5,
        "color": "#d7e6f5",
        "height": 10
      },
      "encoding": {
        "y": {
          "field": "country",
          "type": "nominal",
          "sort": {
            "field": "rank",
            "order": "ascending"
          },
          "title": null,
          "axis": {
            "labelLimit": 150
          }
        },
        "x": {
      "field": "total_arrivals",
      "type": "quantitative",
      "title": "Visitor arrivals",
      "scale": {
        "zero": true
      },
      "axis": {
        "format": "~s"
      }
    }
      }
    },

    {
      "mark": {
        "type": "circle",
        "filled": true,
        "size": 150,
        "color": "#2563eb",
        "stroke": "white",
        "strokeWidth": 1.5
      },
      "encoding": {
        "y": {
          "field": "country",
          "type": "nominal",
          "sort": {
            "field": "rank",
            "order": "ascending"
          },
          "title": null
        },
        "x": {
          "field": "total_arrivals",
          "type": "quantitative"
        },
        "tooltip": [
          {
            "field": "rank",
            "type": "quantitative",
            "title": "Rank"
          },
          {
            "field": "country",
            "type": "nominal",
            "title": "Country"
          },
          {
            "field": "year",
            "type": "ordinal",
            "title": "Year"
          },
          {
            "field": "total_arrivals",
            "type": "quantitative",
            "title": "Arrivals",
            "format": ","
          }
        ]
      }
    },

    {
      "mark": {
        "type": "text",
        "align": "left",
        "baseline": "middle",
        "dx": 8,
        "font": "Inter",
        "fontSize": 11,
        "fontWeight": "600",
        "color": "#334155"
      },
      "encoding": {
        "y": {
          "field": "country",
          "type": "nominal",
          "sort": {
            "field": "rank",
            "order": "ascending"
          }
        },
        "x": {
          "field": "total_arrivals",
          "type": "quantitative"
        },
        "text": {
          "field": "total_arrivals",
          "type": "quantitative",
          "format": ".3s"
        }
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "gridColor": "#e5edf5",
      "domainColor": "#cbd5e1",
      "tickColor": "#cbd5e1"
    }
  }
};

vegaEmbed("#chart_top_countries", topCountries, {"actions": false});

vegaEmbed("#chart_top_countries", topCountries, {"actions": false});

vegaEmbed("#chart_top_countries", topCountries, {"actions": false});
var riseAsia = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 360,

  "data": {
    "url": "data/region_source_share_2000_2025.csv"
  },

  "layer": [
    {
      "mark": {
        "type": "line",
        "strokeWidth": 3,
        "point": false
      },
      "encoding": {
        "x": {
          "field": "year",
          "type": "ordinal",
          "title": null,
          "axis": {
            "labelAngle": 0
          }
        },
        "y": {
          "field": "share",
          "type": "quantitative",
          "title": "Share of visitor arrivals",
          "axis": {
            "format": "%"
          }
        },
        "color": {
          "field": "region",
          "type": "nominal",
          "title": "Region",
          "scale": {
            "range": ["#2563eb", "#16a34a", "#f97316", "#7c3aed", "#64748b"]
          },
          "legend": {
            "orient": "bottom",
            "columns": 2
          }
        },
        "detail": {
          "field": "region",
          "type": "nominal"
        },
        "tooltip": [
          {
            "field": "region",
            "type": "nominal",
            "title": "Region"
          },
          {
            "field": "year",
            "type": "ordinal",
            "title": "Year"
          },
          {
            "field": "share",
            "type": "quantitative",
            "title": "Share",
            "format": ".1%"
          },
          {
            "field": "region_arrivals",
            "type": "quantitative",
            "title": "Arrivals",
            "format": ","
          }
        ]
      }
    },

    {
      "mark": {
        "type": "circle",
        "filled": true,
        "size": 130,
        "stroke": "white",
        "strokeWidth": 1.5
      },
      "encoding": {
        "x": {
          "field": "year",
          "type": "ordinal"
        },
        "y": {
          "field": "share",
          "type": "quantitative"
        },
        "color": {
          "field": "region",
          "type": "nominal",
          "scale": {
            "range": ["#2563eb", "#16a34a", "#f97316", "#7c3aed", "#64748b"]
          },
          "legend": null
        },
        "tooltip": [
          {
            "field": "region",
            "type": "nominal",
            "title": "Region"
          },
          {
            "field": "year",
            "type": "ordinal",
            "title": "Year"
          },
          {
            "field": "share",
            "type": "quantitative",
            "title": "Share",
            "format": ".1%"
          }
        ]
      }
    },

    {
      "transform": [
        {
          "filter": "datum.year == 2025"
        }
      ],
      "mark": {
        "type": "text",
        "align": "left",
        "baseline": "middle",
        "dx": 10,
        "font": "Inter",
        "fontSize": 12,
        "fontWeight": "700"
      },
      "encoding": {
        "x": {
          "field": "year",
          "type": "ordinal"
        },
        "y": {
          "field": "share",
          "type": "quantitative"
        },
        "text": {
          "field": "region",
          "type": "nominal"
        },
        "color": {
          "field": "region",
          "type": "nominal",
          "scale": {
            "range": ["#2563eb", "#16a34a", "#f97316", "#7c3aed", "#64748b"]
          },
          "legend": null
        }
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "gridColor": "#e5edf5",
      "domainColor": "#cbd5e1",
      "tickColor": "#cbd5e1"
    },
    "legend": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033"
    }
  }
};

vegaEmbed("#chart_rise_asia", riseAsia, {"actions": false});
var reasonStacked = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 340,

  "data": {
    "url": "data/arrivals_by_purpose.csv"
  },

  "transform": [
    {
      "calculate": "toNumber(datum.year)",
      "as": "year_num"
    },
    {
      "filter": "(datum.year_num == 2000 || datum.year_num == 2010 || datum.year_num == 2019 || datum.year_num == 2025) && isValid(datum.arrivals) && datum.purpose != 'Total (Reason for Journey)'"
    },
    {
      "aggregate": [
        {
          "op": "sum",
          "field": "arrivals",
          "as": "total_arrivals"
        }
      ],
      "groupby": ["year_num", "purpose"]
    }
  ],

  "mark": {
    "type": "bar"
  },

  "encoding": {
    "x": {
      "field": "year_num",
      "type": "ordinal",
      "title": null,
      "axis": {
        "labelAngle": 0
      }
    },
    "y": {
      "field": "total_arrivals",
      "type": "quantitative",
      "title": "Share of arrivals",
      "stack": "normalize",
      "axis": {
        "format": "%"
      }
    },
    "color": {
      "field": "purpose",
      "type": "nominal",
      "title": "Purpose",
      "scale": {
        "scheme": "tableau10"
      },
      "legend": {
        "orient": "bottom",
        "columns": 2,
        "labelLimit": 150
      }
    },
    "tooltip": [
      {
        "field": "year_num",
        "type": "ordinal",
        "title": "Year"
      },
      {
        "field": "purpose",
        "type": "nominal",
        "title": "Purpose"
      },
      {
        "field": "total_arrivals",
        "type": "quantitative",
        "title": "Arrivals",
        "format": ","
      }
    ]
  },

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "gridColor": "#e5edf5",
      "domainColor": "#cbd5e1",
      "tickColor": "#cbd5e1"
    },
    "legend": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033"
    }
  }
};

vegaEmbed("#chart_reason_stacked", reasonStacked, {"actions": false});

vegaEmbed("#chart_reason_stacked", reasonStacked, {"actions": false});
var durationDistribution = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 340,

  "data": {
    "url": "data/arrivals_by_duration.csv"
  },

  "transform": [
    {
      "filter": "datum.year == 2025 && isValid(datum.arrivals) && datum.duration != 'Total (Duration of stay in days)'"
    },
    {
      "aggregate": [
        {
          "op": "sum",
          "field": "arrivals",
          "as": "total_arrivals"
        }
      ],
      "groupby": ["duration"]
    },
    {
      "joinaggregate": [
        {
          "op": "sum",
          "field": "total_arrivals",
          "as": "all_arrivals"
        }
      ]
    },
    {
      "calculate": "datum.total_arrivals / datum.all_arrivals",
      "as": "share"
    },
    {
      "calculate": "datum.duration == 'Under 1 week' ? 1 : datum.duration == '1 and under 2 weeks' ? 2 : datum.duration == '2 weeks and under 1 month' ? 3 : datum.duration == '1 and under 2 months' ? 4 : datum.duration == '2 and under 3 months' ? 5 : datum.duration == '3 and under 6 months' ? 6 : datum.duration == '6 and under 12 months' ? 7 : 8",
      "as": "duration_order"
    }
  ],

  "layer": [
    {
      "mark": {
        "type": "bar",
        "cornerRadiusEnd": 8,
        "height": 18,
        "color": "#93c5fd"
      },
      "encoding": {
        "y": {
          "field": "duration",
          "type": "nominal",
          "sort": {
            "field": "duration_order",
            "order": "ascending"
          },
          "title": null,
          "axis": {
            "labelLimit": 170
          }
        },
        "x": {
          "field": "share",
          "type": "quantitative",
          "title": "Share of 2025 visitor arrivals",
          "axis": {
            "format": "%"
          }
        },
        "tooltip": [
          {
            "field": "duration",
            "type": "nominal",
            "title": "Length of stay"
          },
          {
            "field": "total_arrivals",
            "type": "quantitative",
            "title": "Arrivals",
            "format": ","
          },
          {
            "field": "share",
            "type": "quantitative",
            "title": "Share",
            "format": ".1%"
          }
        ]
      }
    },

    {
      "mark": {
        "type": "text",
        "align": "left",
        "baseline": "middle",
        "dx": 6,
        "font": "Inter",
        "fontSize": 11,
        "fontWeight": "700",
        "color": "#172033"
      },
      "encoding": {
        "y": {
          "field": "duration",
          "type": "nominal",
          "sort": {
            "field": "duration_order",
            "order": "ascending"
          }
        },
        "x": {
          "field": "share",
          "type": "quantitative"
        },
        "text": {
          "field": "share",
          "type": "quantitative",
          "format": ".0%"
        }
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "gridColor": "#e5edf5",
      "domainColor": "#cbd5e1",
      "tickColor": "#cbd5e1"
    }
  }
};

vegaEmbed("#chart_duration_distribution", durationDistribution, {"actions": false});
var airportMap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 470,

  "layer": [
    {
      "data": {
        "url": "https://vega.github.io/vega-datasets/data/world-110m.json",
        "format": {
          "type": "topojson",
          "feature": "countries"
        }
      },
      "transform": [
        {
          "filter": "datum.id == 36"
        }
      ],
      "projection": {
        "type": "mercator"
      },
      "mark": {
        "type": "geoshape",
        "fill": "#e5edf5",
        "stroke": "#ffffff",
        "strokeWidth": 1
      }
    },

    {
      "data": {
        "url": "data/airport_traffic.csv"
      },
      "transform": [
        {
          "filter": "datum.year == 2024 && isValid(datum.total_passengers) && isValid(datum.latitude) && isValid(datum.longitude)"
        },
        {
          "aggregate": [
            {
              "op": "sum",
              "field": "total_passengers",
              "as": "passengers"
            },
            {
              "op": "sum",
              "field": "intl_total",
              "as": "international_passengers"
            },
            {
              "op": "sum",
              "field": "dom_total",
              "as": "domestic_passengers"
            },
            {
              "op": "mean",
              "field": "latitude",
              "as": "lat"
            },
            {
              "op": "mean",
              "field": "longitude",
              "as": "lon"
            }
          ],
          "groupby": ["airport"]
        },
        {
          "calculate": "datum.international_passengers / datum.passengers",
          "as": "international_share"
        }
      ],
      "projection": {
        "type": "mercator"
      },
      "mark": {
        "type": "circle",
        "opacity": 0.42,
        "stroke": "white",
        "strokeWidth": 1.5
      },
      "encoding": {
        "longitude": {
          "field": "lon",
          "type": "quantitative"
        },
        "latitude": {
          "field": "lat",
          "type": "quantitative"
        },
        "size": {
          "field": "passengers",
          "type": "quantitative",
          "title": "Total passengers, 2024",
          "scale": {
            "range": [80, 3600]
          },
          "legend": {
            "orient": "bottom",
            "format": "~s"
          }
        },
        "color": {
          "field": "international_share",
          "type": "quantitative",
          "title": "International share",
          "scale": {
            "scheme": "tealblues"
          },
          "legend": {
            "orient": "bottom",
            "format": "%"
          }
        },
        "tooltip": [
          {
            "field": "airport",
            "type": "nominal",
            "title": "Airport"
          },
          {
            "field": "passengers",
            "type": "quantitative",
            "title": "Total passengers, 2024",
            "format": ","
          },
          {
            "field": "domestic_passengers",
            "type": "quantitative",
            "title": "Domestic passengers",
            "format": ","
          },
          {
            "field": "international_passengers",
            "type": "quantitative",
            "title": "International passengers",
            "format": ","
          },
          {
            "field": "international_share",
            "type": "quantitative",
            "title": "International share",
            "format": ".1%"
          }
        ]
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },
    "legend": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033"
    }
  }
};

vegaEmbed("#chart_airport_map", airportMap, {"actions": false});
var airportMix = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 380,

  "data": {
    "url": "data/airport_traffic.csv"
  },

  "transform": [
    {
      "filter": "datum.year == 2024 && isValid(datum.dom_total) && isValid(datum.intl_total)"
    },
    {
      "aggregate": [
        {
          "op": "sum",
          "field": "dom_total",
          "as": "Domestic"
        },
        {
          "op": "sum",
          "field": "intl_total",
          "as": "International"
        }
      ],
      "groupby": ["airport"]
    },
    {
      "calculate": "datum.Domestic + datum.International",
      "as": "total_passengers"
    },
    {
      "calculate": "datum.International / datum.total_passengers",
      "as": "international_share"
    },
    {
      "fold": ["Domestic", "International"],
      "as": ["passenger_type", "passengers"]
    }
  ],

  "mark": {
    "type": "bar"
  },

  "encoding": {
    "y": {
      "field": "airport",
      "type": "nominal",
      "title": null,
      "sort": {
        "field": "international_share",
        "order": "descending"
      },
      "axis": {
        "labelLimit": 120
      }
    },
    "x": {
      "field": "passengers",
      "type": "quantitative",
      "title": "Share of passengers",
      "stack": "normalize",
      "axis": {
        "format": "%"
      }
    },
    "color": {
      "field": "passenger_type",
      "type": "nominal",
      "title": "Passenger type",
      "scale": {
        "range": ["#93c5fd", "#1e3a8a"]
      },
      "legend": {
        "orient": "bottom"
      }
    },
    "tooltip": [
      {
        "field": "airport",
        "type": "nominal",
        "title": "Airport"
      },
      {
        "field": "passenger_type",
        "type": "nominal",
        "title": "Type"
      },
      {
        "field": "passengers",
        "type": "quantitative",
        "title": "Passengers",
        "format": ","
      },
      {
        "field": "international_share",
        "type": "quantitative",
        "title": "International share",
        "format": ".1%"
      }
    ]
  },

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "gridColor": "#e5edf5",
      "domainColor": "#cbd5e1",
      "tickColor": "#cbd5e1"
    },
    "legend": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033"
    }
  }
};

vegaEmbed("#chart_airport_mix", airportMix, {"actions": false});
var airportRecovery = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 380,

  "data": {
    "url": "data/airport_recovery_2019_2024.csv"
  },

  "transform": [
    {
      "calculate": "datum.recovery_index * 100",
      "as": "recovery_percent"
    }
  ],

  "layer": [
    {
      "mark": {
        "type": "rule",
        "strokeDash": [5, 5],
        "strokeWidth": 2,
        "color": "#ef4444"
      },
      "encoding": {
        "x": {
          "datum": 100
        }
      }
    },

    {
      "mark": {
        "type": "bar",
        "cornerRadiusEnd": 6,
        "height": 14
      },
      "encoding": {
        "y": {
          "field": "airport",
          "type": "nominal",
          "sort": {
            "field": "recovery_percent",
            "order": "descending"
          },
          "title": null,
          "axis": {
            "labelLimit": 120
          }
        },
        "x": {
          "field": "recovery_percent",
          "type": "quantitative",
          "title": "2024 passengers as a percentage of 2019",
          "axis": {
            "format": ".0f"
          },
          "scale": {
            "domain": [0, 120]
          }
        },
        "color": {
          "condition": {
            "test": "datum.recovery_percent >= 100",
            "value": "#16a34a"
          },
          "value": "#2563eb"
        },
        "tooltip": [
          {
            "field": "airport",
            "type": "nominal",
            "title": "Airport"
          },
          {
            "field": "passengers_2019",
            "type": "quantitative",
            "title": "2019 passengers",
            "format": ","
          },
          {
            "field": "passengers_2024",
            "type": "quantitative",
            "title": "2024 passengers",
            "format": ","
          },
          {
            "field": "recovery_percent",
            "type": "quantitative",
            "title": "Recovery index",
            "format": ".1f"
          }
        ]
      }
    },

    {
      "mark": {
        "type": "circle",
        "filled": true,
        "size": 120,
        "color": "#172033",
        "stroke": "white",
        "strokeWidth": 1.4
      },
      "encoding": {
        "y": {
          "field": "airport",
          "type": "nominal",
          "sort": {
            "field": "recovery_percent",
            "order": "descending"
          }
        },
        "x": {
          "field": "recovery_percent",
          "type": "quantitative"
        }
      }
    },

    {
      "mark": {
        "type": "text",
        "align": "left",
        "baseline": "middle",
        "dx": 8,
        "font": "Inter",
        "fontSize": 11,
        "fontWeight": "700",
        "color": "#172033"
      },
      "encoding": {
        "y": {
          "field": "airport",
          "type": "nominal",
          "sort": {
            "field": "recovery_percent",
            "order": "descending"
          }
        },
        "x": {
          "field": "recovery_percent",
          "type": "quantitative"
        },
        "text": {
          "field": "recovery_percent",
          "type": "quantitative",
          "format": ".0f"
        }
      }
    },

    {
      "mark": {
        "type": "text",
        "align": "left",
        "baseline": "bottom",
        "dx": 5,
        "dy": -8,
        "font": "Inter",
        "fontSize": 11,
        "fontWeight": "700",
        "color": "#ef4444"
      },
      "encoding": {
        "x": {
          "datum": 100
        },
        "y": {
          "datum": "ADELAIDE"
        },
        "text": {
          "value": "2019 level"
        }
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "gridColor": "#e5edf5",
      "domainColor": "#cbd5e1",
      "tickColor": "#cbd5e1"
    }
  }
};

vegaEmbed("#chart_airport_recovery", airportRecovery, {"actions": false});

var seasonalityHeatmap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 360,

  "data": {
    "url": "data/arrivals_by_country.csv"
  },

  "transform": [
    {
      "filter": "datum.year >= 1991 && datum.year <= 2025 && isValid(datum.arrivals) && datum.country == 'Total (Country of stay/residence)'"
    },
    {
      "aggregate": [
        {
          "op": "sum",
          "field": "arrivals",
          "as": "total_arrivals"
        }
      ],
      "groupby": ["year", "month"]
    },
    {
      "calculate": "datum.month == 1 ? 'Jan' : datum.month == 2 ? 'Feb' : datum.month == 3 ? 'Mar' : datum.month == 4 ? 'Apr' : datum.month == 5 ? 'May' : datum.month == 6 ? 'Jun' : datum.month == 7 ? 'Jul' : datum.month == 8 ? 'Aug' : datum.month == 9 ? 'Sep' : datum.month == 10 ? 'Oct' : datum.month == 11 ? 'Nov' : 'Dec'",
      "as": "month_name"
    }
  ],

  "mark": {
    "type": "rect",
    "cornerRadius": 2
  },

  "encoding": {
    "x": {
      "field": "year",
      "type": "ordinal",
      "title": "Year",
      "axis": {
        "labelAngle": 0,
        "labelOverlap": "greedy"
      }
    },
    "y": {
      "field": "month_name",
      "type": "ordinal",
      "title": null,
      "sort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    "color": {
      "field": "total_arrivals",
      "type": "quantitative",
      "title": "Monthly arrivals",
      "scale": {
        "scheme": "blues"
      },
      "legend": {
        "orient": "bottom",
        "format": "~s"
      }
    },
    "tooltip": [
      {
        "field": "month_name",
        "type": "nominal",
        "title": "Month"
      },
      {
        "field": "year",
        "type": "ordinal",
        "title": "Year"
      },
      {
        "field": "total_arrivals",
        "type": "quantitative",
        "title": "Arrivals",
        "format": ","
      }
    ]
  },

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "grid": false,
      "domain": false,
      "ticks": false
    },
    "legend": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033"
    }
  }
};

vegaEmbed("#chart_seasonality", seasonalityHeatmap, {"actions": false});
var airportTrends = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 390,
  "params": [
  {
    "name": "highlight_airport",
    "select": {
      "type": "point",
      "fields": ["airport"],
      "on": "mouseover",
      "clear": "mouseout"
    }
  }
],

  "data": {
    "url": "data/airport_traffic.csv"
  },

  "transform": [
    {
      "filter": "isValid(datum.total_passengers) && datum.year >= 2015 && datum.year <= 2025"
    },
    {
      "filter": "datum.airport == 'SYDNEY' || datum.airport == 'MELBOURNE' || datum.airport == 'BRISBANE' || datum.airport == 'PERTH' || datum.airport == 'ADELAIDE'"
    },
    {
      "calculate": "toDate(datum.date)",
      "as": "date_parsed"
    }
  ],

  "mark": {
    "type": "line",
    "strokeWidth": 2.5
  },

  "encoding": {
    "x": {
      "field": "date_parsed",
      "type": "temporal",
      "title": null,
      "axis": {
        "format": "%Y",
        "labelAngle": 0
      }
    },
    "y": {
      "field": "total_passengers",
      "type": "quantitative",
      "title": "Monthly passengers",
      "axis": {
        "format": "~s"
      }
    },
    "color": {
      "field": "airport",
      "type": "nominal",
      "title": "Airport",
      "scale": {
        
        "range": ["#2563eb", "#16a34a", "#f97316", "#7c3aed", "#64748b"]
      },
      "legend": {
        "orient": "bottom",
        "columns": 5
      }
    },
    "tooltip": [
      {
        "field": "airport_label",
        "type": "nominal",
        "title": "Airport"
      },
      {
        "field": "date_parsed",
        "type": "temporal",
        "title": "Month",
        "format": "%b %Y"
      },
      {
        "field": "total_passengers",
        "type": "quantitative",
        "title": "Passengers",
        "format": ","
      }
    ]
  },

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033",
      "gridColor": "#e5edf5",
      "domainColor": "#cbd5e1",
      "tickColor": "#cbd5e1"
    },
    "legend": {
      "labelFont": "Inter",
      "titleFont": "Inter",
      "labelColor": "#5f6f86",
      "titleColor": "#172033"
    }
  }
};

vegaEmbed("#chart_airport_trends", airportTrends, {"actions": false});