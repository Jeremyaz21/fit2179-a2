import re
import json
from pathlib import Path

js_path = Path("js/vega_lite_vis.js")
specs_dir = Path("specs")
specs_dir.mkdir(exist_ok=True)

js = js_path.read_text(encoding="utf-8")

specs = {
    "arrivalsTimeline": "01_arrivals_timeline.json",
    "purposeArea": "02_purpose_area.json",
    "worldMap": "03_world_source_country_choropleth.json",
    "topCountries": "04_top_source_countries_lollipop.json",
    "riseAsia": "05_rise_of_asia_slope_chart.json",
    "reasonStacked": "06_main_reason_for_journey_stacked_bar.json",
    "durationDistribution": "07_length_of_stay_distribution.json",
    "airportMap": "08_australian_airport_bubble_map.json",
    "airportMix": "09_domestic_international_airport_mix.json",
    "airportRecovery": "10_airport_recovery_index.json",
    "seasonalityHeatmap": "11_seasonality_heatmap.json",
    "airportTrends": "12_top_airport_passenger_trends.json",
}

def extract_object(text, var_name):
    pattern = f"var {var_name} = "
    start = text.find(pattern)

    if start == -1:
        print(f"Could not find variable: {var_name}")
        return None

    brace_start = text.find("{", start)
    if brace_start == -1:
        print(f"Could not find opening brace for: {var_name}")
        return None

    depth = 0
    in_string = False
    escape = False

    for i in range(brace_start, len(text)):
        ch = text[i]

        if escape:
            escape = False
            continue

        if ch == "\\":
            escape = True
            continue

        if ch == '"':
            in_string = not in_string
            continue

        if not in_string:
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return text[brace_start:i + 1]

    print(f"Could not fully extract object for: {var_name}")
    return None

for var_name, filename in specs.items():
    obj_text = extract_object(js, var_name)

    if obj_text is None:
        continue

    try:
        parsed = json.loads(obj_text)
    except json.JSONDecodeError as e:
        print(f"JSON error in {var_name}: {e}")
        continue

    out_path = specs_dir / filename
    out_path.write_text(json.dumps(parsed, indent=2), encoding="utf-8")
    print(f"Created {out_path}")

readme = """# Vega-Lite Specifications

This folder contains readable Vega-Lite JSON specifications for the visualisations used in the project.

The webpage itself embeds the same visualisations through `js/vega_lite_vis.js`, while these JSON files are provided so the chart specifications are easy to inspect in the GitHub repository.

## Files

1. `01_arrivals_timeline.json` — total international arrivals timeline
2. `02_purpose_area.json` — purpose of visit stacked area chart
3. `03_world_source_country_choropleth.json` — world source-country choropleth map
4. `04_top_source_countries_lollipop.json` — top 10 source countries lollipop chart
5. `05_rise_of_asia_slope_chart.json` — regional share slope chart
6. `06_main_reason_for_journey_stacked_bar.json` — main reason for journey stacked bar
7. `07_length_of_stay_distribution.json` — visitor length-of-stay distribution
8. `08_australian_airport_bubble_map.json` — Australian airport bubble map
9. `09_domestic_international_airport_mix.json` — domestic versus international airport mix
10. `10_airport_recovery_index.json` — airport recovery index
11. `11_seasonality_heatmap.json` — visitor arrivals seasonality heatmap
12. `12_top_airport_passenger_trends.json` — top airport monthly passenger trends
"""

(specs_dir / "README.md").write_text(readme, encoding="utf-8")
print("Created specs/README.md")