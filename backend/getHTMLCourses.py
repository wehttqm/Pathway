from bs4 import BeautifulSoup
import requests
import re
from prereqParser import hunt_for_prereqs
import traceback


def get_courses(html: bytes):
    try:
        soup = BeautifulSoup(html, "html.parser")
        div = soup.find(
            "div",
            class_=re.compile("^w3-row view view-courses-view view-id-courses_view"),
        )
        view_content_div = div.find("div", class_=re.compile("view-content"))
        child_divs = view_content_div.find_all("div", recursive=False)

        courses = []

        for child_div in child_divs:
            d = {}

            try:
                # Extract course name
                course_name = child_div.find("div", {"aria-label": True}).get_text(
                    strip=True
                )
                d["name"] = course_name

                # Extract description
                description = child_div.find(
                    "div", class_="views-field-field-desc"
                ).get_text(strip=True)
                d["description"] = description

                # Extract prerequisites

                try:
                    prerequisites = (
                        child_div.find(
                            "span", class_="views-field-field-prerequisite"
                        ).get_text(strip=False)
                    )[15:]
                    og_prereqs = prerequisites
                    prerequisites: str = re.split(r"(\s+|\(|\)|\[|\])", prerequisites)
                    prerequisites = [i for i in prerequisites if (i != " " and i != "")]
                    prerequisites = hunt_for_prereqs(prerequisites)
                    d["prerequisites"] = prerequisites[0]
                except:
                    d["prerequisites"] = og_prereqs

                courses.append(d)
                # print(f"Course: {d['name']}, Prerequisites: {d['prerequisites']}")
            except:

                print("getHTMLCourses: failed to collect course data")

        return courses
    except:
        print("getHTMLCourses: Failed to initiate scraping")
        return []


def getHTMLCourses(url: str):
    print(url)
    response = requests.get(url)

    if response.status_code != 200:
        print("Error getting HTML")
    else:
        html = response.content
        return get_courses(html)


if __name__ == "__main__":
    import json

    with open("programAreas.json", "r") as fin:
        program_areas = json.loads(fin.read())
        for area in program_areas:

            htmlCourses = getHTMLCourses(
                f"""https://utm.calendar.utoronto.ca/section/{area["href"]}"""
            )
            with open(area["href"] + ".json", "w") as fout:
                data = json.dump(htmlCourses, fout)
