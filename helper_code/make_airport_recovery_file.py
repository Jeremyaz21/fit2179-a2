import pandas as pd

df = pd.read_csv("data/airport_traffic.csv")

df = df[df["year"].isin([2019, 2024])].copy()
df["total_passengers"] = pd.to_numeric(df["total_passengers"], errors="coerce")

annual = (
    df.groupby(["airport", "year"], as_index=False)["total_passengers"]
    .sum()
)

wide = annual.pivot(index="airport", columns="year", values="total_passengers").reset_index()
wide.columns.name = None

wide = wide.rename(columns={
    2019: "passengers_2019",
    2024: "passengers_2024"
})

wide = wide.dropna(subset=["passengers_2019", "passengers_2024"]).copy()

wide["recovery_index"] = wide["passengers_2024"] / wide["passengers_2019"]
wide["max_passengers"] = wide[["passengers_2019", "passengers_2024"]].max(axis=1)

top10 = wide.sort_values("max_passengers", ascending=False).head(10).copy()

top10.to_csv("data/airport_recovery_2019_2024.csv", index=False)

print("Created data/airport_recovery_2019_2024.csv")
print(top10.to_string(index=False))