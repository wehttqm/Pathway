import json
from getHTMLCourses import getHTMLCourses

if __name__ == "__main__":
    codes = {}
    with open("programAreas.json") as file:
        program_areas = json.loads(file.read())
        for area in program_areas:
            code_set = set()
            courses = getHTMLCourses(
                "https://utm.calendar.utoronto.ca/section/" + area["href"]
            )
            for course in courses:
                code_set.add(course["name"][:3])
            for c in code_set:
                codes.setdefault(c, []).append(area["href"])
    with open("courseCodes.json", "w") as fout:
        json.dump(codes, fout)
