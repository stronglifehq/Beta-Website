import pandas as pd

from coupang import get_coupang_data
from firebase import insert_row, delete_collection
from default import get_data

# delete all documents in the collection
# delete_collection(100)


df = pd.read_csv("crawler/products.csv")


coupang_df = df[df["링크"].notna()]
coupang_df = coupang_df[coupang_df["링크"].str.contains("https://www.coupang.com")]

not_coupang_df = df[~df["링크"].str.contains("https://www.coupang.com", na=False)]

for index, row in not_coupang_df.iterrows():
    data = get_data(row)
    data["category"] = row["카테고리"]
    data["oneline"] = row["한줄 소개(20자 이내)"]
    if not pd.isnull(row["태그"]):
        data["tag"] = row["태그"]
    print(data)
    insert_row(data)

for index, row in coupang_df.iterrows():
    data = get_coupang_data(row["링크"])
    data["category"] = row["카테고리"]
    data["oneline"] = row["한줄 소개(20자 이내)"]
    if not pd.isnull(row["태그"]):
        data["tag"] = row["태그"]
    insert_row(data)
