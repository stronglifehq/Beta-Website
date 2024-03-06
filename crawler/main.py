import pandas as pd

from coupang import get_coupang_data
from firebase import insert_row


# insert_row(get_coupang_data("https://www.coupang.com/vp/products/1390753940?itemId=2426008262&vendorItemId=70420025322&q=%ED%97%AC%EC%8A%A4+%EC%8A%A4%ED%8A%B8%EB%9E%A9&itemsCount=36&searchId=59489f00f7a544b8937a110fd855c3ab&rank=7&isAddedCart="))

# # import data.csv
df = pd.read_csv('crawler/data.csv')

# filter rows with column 링크 empty
df = df[df['링크'].notna()]

# filter rows with column 링크 containing coupang.com
coupang_df = df[df['링크'].str.contains('https://www.coupang.com')]

# loop through each row in coupang_df
for index, row in coupang_df.iterrows():
    data = get_coupang_data(row['링크'])
    data["category"] = row["카테고리"]
    insert_row(data)
