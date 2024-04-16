import pandas as pd


# example_res = {
#     "title": "헬스 스트랩",
#     "images": [
#         "https://static.coupangcdn.com/image/vendor_inventory/images/2019/07/29/14/2/3d3a2e6c-5a5a-4a1b-8b5a-6b3a0b3d4e6f.jpg",
#         "https://static.coupangcdn.com/image/vendor_inventory/images/2019/07/29/14/2/3d3a2e6c-5a5a-4a1b-8b5a-6b3a0b3d4e6f.jpg",
#         "https://static.coupangcdn.com/image/vendor_inventory/images/2019/07/29/14/2/3d3a2e6c-5a5a-4a1b-8b5a-6b3a0b3d4e6f.jpg"
#     ],
#     "details": ["https://static.coupangcdn.com/image/vendor_inventory/images/2019/07/29/14/2/3d3a2e6c-5a5a-4a1b-8b5a-6b3a0b3d4e6f.jpg"],
#     "url": "https://www.coupang.com/vp/products/1390753940?itemId=2426008262&vendorItemId=70420025322&q=%ED%97%AC%EC%8A%A4+%EC%8A%A4%ED%8A%B8%EB%9E%A9&itemsCount=36&searchId=59489f00f7a544b8937a110fd855c3ab&rank=7&isAddedCart=",
#     "rating": 0,
#     "selected_option": 0,
#     "options": {
#         "name": "사이즈",
#         "attributes" : [
#             {
#                 "name": "S",
#                 "price": 1000,
#                 "original_price": 2000
#             }
#         ]
#     }
# }


def get_data(row):

    # check if nan
    if row["제품 이미지 (썸네일 제외)"] == row["제품 이미지 (썸네일 제외)"]:
        images = [row["제품 썸네일"]] + list(
            filter(
                lambda x: x,
                map(lambda x: x.strip(), row["제품 이미지 (썸네일 제외)"].split("\n")),
            )
        )
    else:
        images = [row["제품 썸네일"]]

    if row["제품 설명 (이미지)"] == row["제품 설명 (이미지)"]:
        details = list(
            filter(
                lambda x: x,
                map(lambda x: x.strip(), row["제품 설명 (이미지)"].split("\n")),
            )
        )
    else:
        details = []

    res = {
        "title": row["제품명"],
        "images": images,
        "details": details,
        "url": row["링크"],
        "rating": 100,
        "selected_option": 0,
        "options": {
            "name": "기본",
            "attributes": [
                {"name": "기본", "price": row["가격"], "original_price": row["가격"]}
            ],
        },
    }

    return res


if __name__ == "__main__":
    df = pd.read_csv("crawler/products.csv")
    not_coupang_df = df[~df["링크"].str.contains("https://www.coupang.com", na=False)]
    # get first row
    row = not_coupang_df.iloc[0]
    print(row)
    get_data(row)
