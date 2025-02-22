from bs4 import BeautifulSoup
import requests
import re

def get_courses(html: bytes):
    soup = BeautifulSoup(html, 'html.parser')
    div = soup.find('div', class_=re.compile('^w3-row view view-courses-view view-id-courses_view'))
    view_content_div = div.find('div', class_=re.compile('view-content'))
    child_divs = view_content_div.find_all('div', recursive=False)
    courses = []

    for child_div in child_divs:
        d = {}

        try:
            # Extract course name
            course_name = child_div.find('div', {'aria-label': True}).get_text(strip=True)

            # Extract description
            description = child_div.find('div', class_='views-field-field-desc').get_text(strip=True)

            # Extract prerequisites
            prerequisites = (child_div.find('span', class_='views-field-field-prerequisite').get_text(strip=False))[15:]
            prerequisites: str = re.split(r'(\s+|\(|\)|\[|\])', prerequisites)
            prerequisites = [i for i in prerequisites if (i != " " and i != '')]

            d["name"] = course_name
            d["description"] = description
            d["prerequisites"] = prerequisites
            courses.append(d)
            print(d["prerequisites"])
        except:
            pass

    return courses


def getHTMLCourses(url: str): 
    print(url)
    response = requests.get(url) 

    if response.status_code != 200:
        print("Error getting HTML")
    else:
        html = response.content
        return get_courses(html)
    

if __name__ == "__main__":
    print(getHTMLCourses("https://utm.calendar.utoronto.ca/section/Computer-Science"))