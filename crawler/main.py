import pandas as pd

from coupang import get_coupang_data
from firebase import insert_row, delete_collection

# delete all documents in the collection
# delete_collection(100)


df = pd.read_csv("crawler/data.csv")

# filter rows with column 링크 empty
df = df[df["링크"].notna()]

# filter rows with column 링크 containing coupang.com
coupang_df = df[df["링크"].str.contains("https://www.coupang.com")]

category_set = set(coupang_df["카테고리"])
print(category_set)

# count = 0

# for index, row in coupang_df.iterrows():
#     data = get_coupang_data(row["링크"])
#     data["category"] = row["카테고리"]
#     insert_row(data)

# print(count)
