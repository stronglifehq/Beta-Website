from urllib.parse import parse_qs
from urllib.parse import urlparse

# markdownify
from markdownify import markdownify as md

# beautifulsoup
from bs4 import BeautifulSoup

# demjson
import demjson3

# json
import json

# re
import re

import requests


def get_options(options):
    optionRows = options["optionRows"]
    attributeVendorItemMap = options["attributeVendorItemMap"]
    selectables = [x["name"] for x in optionRows]

    if len(selectables) == 1:
        optionRow = optionRows[0]

        res = {
            "name": optionRow["name"],
            "attributes": [],
        }

        sel = optionRow["selectedAttribute"]["valueId"]

        curr = 0

        for i, size in enumerate(optionRow["attributes"]):
            valueId = size["valueId"]
            if valueId == sel:
                curr = i
            name = size["name"]
            size_obj = attributeVendorItemMap[valueId]

            price = size_obj["quantityBase"][0]["price"]["finalPrice"]
            price = int("".join(filter(str.isdigit, price)))

            try:
                original_price = size_obj["quantityBase"][0]["price"][
                    "i18nOriginPrice"
                ]["amount"]
            except:
                original_price = price
            res["attributes"].append(
                {"name": name, "price": price, "original_price": original_price}
            )

        return curr, res

    if len(selectables) == 2:
        optionRow1 = optionRows[0]
        optionRow2 = optionRows[1]
        attributeVendorItemMap = options["attributeVendorItemMap"]

        res = {
            "name": optionRow1["name"] + " / " + optionRow2["name"],
            "attributes": [],
        }

        sel1 = optionRow1["selectedAttribute"]["valueId"]
        sel2 = optionRow2["selectedAttribute"]["valueId"]

        curr = 0

        for i, size1 in enumerate(optionRow1["attributes"]):
            valueId1 = size1["valueId"]
            name1 = size1["name"]

            for j, size2 in enumerate(optionRow2["attributes"]):
                valueId2 = size2["valueId"]
                name2 = size2["name"]

                try:
                    size_obj = attributeVendorItemMap[valueId1 + ":" + valueId2]

                    price = size_obj["quantityBase"][0]["price"]["finalPrice"]
                    price = int("".join(filter(str.isdigit, price)))

                    try:
                        original_price = size_obj["quantityBase"][0]["price"][
                            "i18nOriginPrice"
                        ]["amount"]
                    except:
                        original_price = price
                    res["attributes"].append(
                        {
                            "name": name1 + " / " + name2,
                            "price": price,
                            "original_price": original_price,
                        }
                    )
                    if valueId2 == sel2 and valueId1 == sel1:
                        curr = len(res["attributes"]) - 1
                except:
                    print("key error")
                    pass
        return curr, res

    else:
        print(
            "WARNING: more than 2 options!WARNING: more than 2 options!WARNING: more than 2 options!WARNING: more than 2 options!WARNING: more than 2 options!WARNING: more than 2 options!WARNING: more than 2 options!"
        )


def get_coupang_data(url):
    # get parameters of url
    print(url)
    parsed_url = urlparse(url)
    item_id = parse_qs(parsed_url.query)["itemId"][0]
    vendor_item_id = parse_qs(parsed_url.query)["vendorItemId"][0]
    item_key = parsed_url.path.split("/")[-1]
    headers = {
        "authority": "www.coupang.com",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "ko,en-US;q=0.9,en;q=0.8",
        "cache-control": "max-age=0",
        "dnt": "1",
        "sec-ch-ua": '"Not(A:Brand";v="24", "Chromium";v="122"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    }

    json_url = f"https://www.coupang.com/vp/products/{item_key}/items/{item_id}/vendoritems/{vendor_item_id}"
    print(json_url)
    json_res = requests.get(json_url, headers=headers).json()
    details = [
        x["vendorItemContentDescriptions"][0]["content"] for x in json_res["details"]
    ]
    details = ["https:" + x for x in details if x.startswith("//")]

    res = {
        "title": "",
        "images": [],
        "details": details,
        "url": url.strip(),
        "rating": 0,
        "selected_option": 0,
        "options": {},
    }

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

    # example_options = {
    #     "name": "사이즈",
    #     "attributes" : [
    #         {
    #             "name": "S",
    #             "price": 1000,
    #             "original_price": 2000
    #         }
    #     ]
    # }

    headers = {
        "accept-language": "ko",
    }

    html = requests.get(url, headers=headers)
    # print(html.text)

    pattern = r"exports\.sdp = (\{.*?\});"
    match = re.search(pattern, html.text, re.DOTALL)

    if match:
        deocoded_obj = demjson3.decode(match.group(1))
        # save to json file
        # with open("coupang.json", "w") as f:
        #     json.dump(deocoded_obj, f)
        res["rating"] = deocoded_obj["ratingAveragePercentage"]
        size_options = deocoded_obj["options"]["attributeVendorItemMap"]

        curr, options = get_options(deocoded_obj["options"])

        res["selected_option"] = curr
        res["options"] = options

        first_size = list(size_options.keys())[0]
        images = size_options[first_size]["images"]
        res["title"] = deocoded_obj["title"]

        for image in images:
            res["images"].append("https:" + image["origin"])

    # check result
    # if len(res["images"]) == 0 or (not res["price"]) or (not res['details']) or (not res['title']) or (not res['url']):
    #     print("WARNING: empty field!")

    return res


if __name__ == "__main__":
    url = """
https://www.coupang.com/vp/products/6067131947?itemId=11183848927&vendorItemId=78461721067&q=%EC%97%AC%EC%84%B1+%EC%9A%B4%EB%8F%99%EB%B3%B5+%EC%84%B8%ED%8A%B8&itemsCount=36&searchId=e425dfbbf9b74e6cbcedd1cb8c97cc0d&rank=14&isAddedCart=    """
    print(get_coupang_data(url))
    # pretty print
    print(json.dumps(get_coupang_data(url), indent=4, ensure_ascii=False))
