import pandas as pd

df = pd.read_csv("data/arrivals_by_country.csv")

# Numeric country IDs used by Vega's world-110m TopoJSON map
country_id_map = {
    "Bangladesh": 50,
    "Brazil": 76,
    "Canada": 124,
    "China": 156,
    "France": 250,
    "Germany": 276,
    "Hong Kong": 344,
    "India": 356,
    "Indonesia": 360,
    "Iran": 364,
    "Ireland": 372,
    "Israel": 376,
    "Italy": 380,
    "Japan": 392,
    "Korea, South": 410,
    "Malaysia": 458,
    "Nepal": 524,
    "New Zealand": 554,
    "Philippines": 608,
    "Saudi Arabia": 682,
    "Singapore": 702,
    "South Africa": 710,
    "Spain": 724,
    "Taiwan": 158,
    "Thailand": 764,
    "UK, CIs & IOM": 826,
    "United Arab Emirates": 784,
    "United States of America": 840,
    "Vietnam": 704
}

# Keep latest full year only
df_2025 = df[(df["year"] == 2025) & (df["country"].isin(country_id_map.keys()))].copy()

# Add map ID
df_2025["id"] = df_2025["country"].map(country_id_map)

# Aggregate monthly rows into annual totals
map_df = (
    df_2025
    .groupby(["country", "id"], as_index=False)["arrivals"]
    .sum()
    .rename(columns={"arrivals": "total_arrivals"})
)

# Save clean map-ready file
map_df.to_csv("data/country_arrivals_2025_map.csv", index=False)

print("Created data/country_arrivals_2025_map.csv")
print(map_df.sort_values("total_arrivals", ascending=False))