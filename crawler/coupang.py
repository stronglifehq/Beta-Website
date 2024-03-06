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


def get_coupang_data(url):
    # get parameters of url
    parsed_url = urlparse(url)
    item_id = parse_qs(parsed_url.query)['itemId'][0]
    vendor_item_id = parse_qs(parsed_url.query)['vendorItemId'][0]
    item_key = parsed_url.path.split('/')[-1]
    headers = {
        'authority': 'www.coupang.com',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'ko,en-US;q=0.9,en;q=0.8',
        'cache-control': 'max-age=0',
        'dnt': '1',
        'sec-ch-ua': '"Not(A:Brand";v="24", "Chromium";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    }

    json_url = f"https://www.coupang.com/vp/products/{item_key}/items/{item_id}/vendoritems/{vendor_item_id}"
    print(json_url)
    json_res = requests.get(json_url, headers=headers).json()
    details = [x["vendorItemContentDescriptions"][0]["content"] for x in json_res["details"]]
    details = [ "https:" + x for x in details if x.startswith("//") ]

    
    res = {"title": "", "images": [], "price": 0, "details": details, "url": url.strip(), "rating":0}
    headers = {
        'accept-language': 'ko',
    }
    html = requests.get(url, headers=headers)
    # print(html.text)
    

    pattern = r'exports\.sdp = (\{.*?\});'
    match = re.search(pattern, html.text, re.DOTALL)
    
    if match:
        deocoded_obj = demjson3.decode(match.group(1))
        # save to json file
        # with open('coupang.json', 'w') as f:
        #     json.dump(deocoded_obj, f)
        res["rating"] = deocoded_obj["ratingAveragePercentage"]
        size_options = deocoded_obj["options"]["attributeVendorItemMap"]
        first_size = list(size_options.keys())[0]
        images = size_options[first_size]["images"]
        res["title"] = deocoded_obj["title"]
        res["price"] = deocoded_obj["quantityBase"][0]["moduleData"][0]["detailPriceBundle"]["finalPrice"]["price"]
        for image in images:
            res["images"].append("https:" + image["origin"])
    
    # check result
    if len(res["images"]) == 0 or (not res["price"]) or (not res['details']) or (not res['title']) or (not res['url']):
        print("WARNING: empty field!")
    
    return res


if __name__ == "__main__":
    url = """
    https://www.coupang.com/vp/products/1390753940?itemId=2426008262&vendorItemId=70420025322&q=%ED%97%AC%EC%8A%A4+%EC%8A%A4%ED%8A%B8%EB%9E%A9&itemsCount=36&searchId=59489f00f7a544b8937a110fd855c3ab&rank=7&isAddedCart=
    """
    print(get_coupang_data(url))
