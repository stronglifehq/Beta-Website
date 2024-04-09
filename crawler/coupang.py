from urllib.parse import parse_qs
from urllib.parse import urlparse

# markdownify
from markdownify import markdownify as md

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
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "ko,en-US;q=0.9,en;q=0.8",
        "cache-control": "max-age=0",
        # 'cookie': 'PCID=12177445065569210022350; x-coupang-accept-language=ko-KR; cf_clearance=deFAT0b0nlPFqwTKKFzcJwq1HSgy2ndyWZlPZsaU8Cg-1708615459-1.0-Aaih0orfMswvu9sCb07cUEU2crcEOFgvBjZ3vZg5uSTaj6+IBcDlH7bmxpyHAwXR0MS4F8WwfnfRtivWlWQfOxw=; authOryRedirection=Y; ILOGIN=Y; gd1=Y; CARTIC=12; SUBCARTIC=0; CSID=; CUPT=; CT_LSID=rzLY6krFTZSff_P5KPNSLxYe3AEZS51QsZtzpOUSc7A; authLoginChallenge=4adf71352cbb4d94a91ec125e30e3a0e; MARKETID=12177445065569210022350; x-coupang-target-market=KR; sid=99798c92122b44b6bcf6346144d988550c09d7f6; overrideAbTestGroup=%5B%5D; _abck=6C4927F803523DD933FBAEB0E09BC9FC~0~YAAQTNojFzhsdZyOAQAAsTJPwwtuoq/ll5qwEBqaFkKluauN7AJhwJlaLXlImAzXULLF9JbkgLWHTRrqPeeK/2GLXE6N3PaHhIqEHeQqIfJxl6C9a2dDMe9lnFHfoi52S3ksEgWc+35g8QObDHx7g7N5hLXbAvfgt5o2qzaQZtYZYPleDW6MxvMFyGkKCuDVpmHutZ0X/mtcZz1MulMYN2rfx7Zq68yGOs1ZtXpoWYOXJIs/MXtW0mAEO+Hg7SvVuXde+FjodlagNYNtCJEBxA1wttOe8BT01BzMYTMN+cuusGXvHfsw4BLzy7A565gPXvxVoKJxOAudMrHA6BRK40fWKET+TsD1JUIuveuXX3+B8LmUisWK+nhuCgH6IxnruySRrQmg2lI23xcblTOb5CpPlLbXub6Sz0jO+41pE7K5fHs1UIKd~-1~-1~-1; bm_mi=847E5268D15467C811084CDD8C516107~YAAQt5/YF3sGj8OOAQAAE+dQwxf9Lt5z9S/i4hiEEYkH9Et6tI6wMHPMvaXIuHfwMcTykOkkqjXNYXsGi8W5mJeZFktyLLpKhIewAS5AoSXkxlz7C3lBE098+4HsSskdCQLLzgaVmV6gvrIXEWhV4SXwcSOqDtVNUaNaE8WIHRlosgrUT7jrKqyOhUiXBPoJWyygoKjgtSayTH6CDLBAlLI3F16VTJhPOZjmuQ/ljUiU5veBKdZpRprS9VcABcKaU1eS2uEz/6NtTWlM77oNnb5xsh3IG1Lgwy1xblqUgu30qFHypPbOBXVPDcS+bZnglBtlGpy/84nthnVNaS0hG1n1hv0=~1; bm_sv=0D6E3AE971C0800EA9D070C2EB7D2518~YAAQnp/YF8+r2rGOAQAAau1Qwxfps7g3OLGjW0NtJBTCCnk1THwebxUUjnEWY9f8uYX9iG2q6bwc/UnLVm6KRF+ZP6bFvG9XLPEcLF1UGKde5feawf9OWIZcl+JYA1RdB/+ONC1BIAxQeq4Bdi36L1sUVVQbgMnvfGBf2dYTbW1hi339/9C4D6fV7cVqueSrNDYQsgi1ZGFVUZJ/XiXRjx28BNmn0MIi7uWqmHx01+K8Q2M4npXIUaNrZ/+baHnlQS8=~1; ak_bmsc=D255BCE5247E2EED36EB81AAA847751E~000000000000000000000000000000~YAAQnp/YF5ne2rGOAQAAnTdRwxfmR59RLTOW4rVhlXsLrcsF+Y2MIAjr9uwIq7yhD9NBteTLTmuxztUtDEe2upIa9YJkmORfmzFjcZCiulD8gqoW2flF7X7kx4AKyoZ9r2qlJ+nk2fq8569RzSgrX3Or2KWpM8slFczaJTtYi2tbbBslLobDiWfplONoDc1D85Dgxr6DqNPQy+2xuW2jLODYa0g3Dtt1+xbI3nGnfspmin9Hw8exyAbNAOqdzaVVxYFlunclpsbJ6T6AYdR4wKkSewM+YG5twbbClI+fk/zIP5EEhfrRno2MOEhqj8RF3mLd4aEaxL0wf9BosKtlNw/kOQy/Z5hQrAPQiCQjt6O1pktDxA1E6heqhDMPTedvF/Q/FuFQ83fRZYcONV7v/uKJ0fBKlf0F0yidibMq1k+VtOSBZ8l8zRgbe3a5cGAhFsdTgiVM4A==; bm_sz=DBD23D9E54ADAEB30A2CAEC6AA5252A9~YAAQZ9ojF1LBsaKOAQAA+cpTwxfdNyHcoXnaqnHJv6wfG2xAOt2wjCIcxVUqNgwWbTUIuZomqBhj8hNin2LjkJ5wM69iPlJblHpEaqFl6o2kmkviA9uSMiTNRjuvjOF3SfENRGDefPa+xV1r7wxJ/Kc6PLL+wUz2YM2+F+hbWjy7TNoUV5RdyNkmAXVr5RQOp5/WT8oHMvKxu5a8WQx24UrDlPZxAz7M3pMyPVLPSF/3ke+V2bXbnshEh58M6TAlhmexBxmNYAku37vn6WBB7rbx7IrPyhXuG3Nrhoh4rJo1b7TR6hrvZrfCYcL99XxDZ5snIWJ0C8WZdT3cpH8yXgRLIHCeGLkNyLdDUephQP63RgNNAYEgIzQLFA42B4vBcOnmZyHMnGfVNOAaPLdzkJqlm9FShOp1J6yt/Nc5faQGqKvWTv9hrASrQsnTIykNb5TrNTWzGZtNhWe0XCjd~3553589~3294017; baby-isWide=small',
        "dnt": "1",
        "sec-ch-ua": '"Chromium";v="123", "Not:A-Brand";v="8"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
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
