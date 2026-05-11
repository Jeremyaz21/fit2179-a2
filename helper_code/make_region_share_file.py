import pandas as pd

df = pd.read_csv("data/arrivals_by_country.csv")

region_map = {
    # Oceania
    "New Zealand": "Oceania",

    # Asia
    "China": "Asia",
    "India": "Asia",
    "Japan": "Asia",
    "Korea, South": "Asia",
    "Singapore": "Asia",
    "Malaysia": "Asia",
    "Indonesia": "Asia",
    "Thailand": "Asia",
    "Vietnam": "Asia",
    "Philippines": "Asia",
    "Hong Kong": "Asia",
    "Taiwan": "Asia",
    "Nepal": "Asia",
    "Bangladesh": "Asia",
    "Iran": "Asia",
    "Israel": "Asia",
    "Saudi Arabia": "Asia",
    "United Arab Emirates": "Asia",

    # Europe
    "UK, CIs & IOM": "Europe",
    "Ireland": "Europe",
    "Germany": "Europe",
    "France": "Europe",
    "Italy": "Europe",
    "Spain": "Europe",

    # North America
    "United States of America": "North America",
    "Canada": "North America",

    # Other
    "South Africa": "Other",
    "Brazil": "Other"
}

df = df[df["year"].isin([2000, 2025])].copy()
df = df[df["country"].isin(region_map.keys())].copy()

df["region"] = df["country"].map(region_map)

region_totals = (
    df.groupby(["year", "region"], as_index=False)["arrivals"]
    .sum()
    .rename(columns={"arrivals": "region_arrivals"})
)

year_totals = (
    region_totals.groupby("year", as_index=False)["region_arrivals"]
    .sum()
    .rename(columns={"region_arrivals": "year_total"})
)

region_share = region_totals.merge(year_totals, on="year")
region_share["share"] = region_share["region_arrivals"] / region_share["year_total"]
region_share["share_percent"] = region_share["share"] * 100

region_share = region_share.sort_values(["region", "year"])

region_share.to_csv("data/region_source_share_2000_2025.csv", index=False)

print("Created data/region_source_share_2000_2025.csv")
print(region_share.to_string(index=False))
