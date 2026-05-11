import pandas as pd

# Read original country arrivals file
df = pd.read_csv("data/arrivals_by_country.csv")

# ISO3 codes for individual countries in the ABS data
iso_map = {
    "Bangladesh": "BGD",
    "Brazil": "BRA",
    "Canada": "CAN",
    "China": "CHN",
    "France": "FRA",
    "Germany": "DEU",
    "Hong Kong": "HKG",
    "India": "IND",
    "Indonesia": "IDN",
    "Iran": "IRN",
    "Ireland": "IRL",
    "Israel": "ISR",
    "Italy": "ITA",
    "Japan": "JPN",
    "Korea, South": "KOR",
    "Malaysia": "MYS",
    "Nepal": "NPL",
    "New Zealand": "NZL",
    "Philippines": "PHL",
    "Saudi Arabia": "SAU",
    "Singapore": "SGP",
    "South Africa": "ZAF",
    "Spain": "ESP",
    "Taiwan": "TWN",
    "Thailand": "THA",
    "UK, CIs & IOM": "GBR",
    "United Arab Emirates": "ARE",
    "United States of America": "USA",
    "Vietnam": "VNM"
}

# Add ISO3 column
df["iso3"] = df["country"].map(iso_map)

# Keep only individual countries for the world map
# This removes regional totals like "Total Oceania and Antarctica"
country_df = df.dropna(subset=["iso3"]).copy()

# Reorder columns
country_df = country_df[["date", "year", "month", "country", "iso3", "arrivals"]]

# Save new clean file
country_df.to_csv("data/arrivals_by_country_iso.csv", index=False)

print("Created data/arrivals_by_country_iso.csv")
print("Rows:", len(country_df))
print("Countries:", country_df["country"].nunique())
print(country_df[["country", "iso3"]].drop_duplicates().sort_values("country"))