from bs4 import BeautifulSoup
import requests
import re
from prereqParser import hunt_for_prereqs
import traceback


def _get_program_areas(html: bytes):
    soup = BeautifulSoup(html, "html.parser")
    div = soup.find("div", class_=re.compile("^w3-row node__content"))
    inner_div = div.find(
        "div",
        class_=re.compile(
            "w3-row field field--name-body field--type-text-with-summary field--label-hidden w3-bar-item field__item"
        ),
    )
    tables = inner_div.find_all("table", recursive=False)

    program_areas = []
    _names = []

    for table in tables:
        body = table.find("tbody")
        rows = body.find_all("tr")
        for row in rows:
            d = row.find("td")
            a = d.find("a")

            text = a.get_text(strip=False)
            # prevent duplicates
            if text not in _names:
                href = a["href"].rsplit("/", 1)[1]
                program_areas.append({"href": href, "name": text})
                _names.append(text)

    return program_areas


def get_program_areas(url: str = "https://utm.calendar.utoronto.ca/list-program-areas"):
    response = requests.get(url)

    if response.status_code != 200:
        print("Error getting HTML")
    else:
        html = response.content
        return _get_program_areas(html)


if __name__ == "__main__":
    import json

    with open("programAreas.json", "w") as fout:
        json.dump(get_program_areas(), fout)
