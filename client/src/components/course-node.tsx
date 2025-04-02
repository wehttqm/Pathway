import { memo, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";

import { CourseCodes, CourseData, CourseNodeProps } from "@/lib/types";
import { useSideMenuContext } from "@/providers/useSideMenuProvider";
import { cn } from "@/lib/utils";

async function getCourseData(areas: string[], code: string, school: string) {
  if (areas) {
    for (const area of areas) {
      try {
        const area_data = await import(
          `@/assets/${school}/programs/${area}.json`
        );
        for (const course of area_data.default) {
          if (course["name"].slice(0, 8) == code) {
            return course;
          }
        }
      } catch (error) {
        console.error("Error loading the JSON file: ", error);
      }
    }
  }
  return null;
}

function CourseNode({ data }: CourseNodeProps) {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const { open, setOpen, course, setCourse } = useSideMenuContext();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseCodes = await import(
          `@/assets/${data.school}/courseCodes.json`
        );
        const typedCourseCodes: CourseCodes = courseCodes;
        const areas = typedCourseCodes[data.code.slice(0, 3)] || null;
        const course = await getCourseData(areas, data.code, data.school);
        setCourseData(course);
      } catch (error) {
        console.error("Error loading the JSON file: ", error);
      }
    };

    fetchCourseData();
  });

  return (
    <>
      <div
        onClick={() => {
          if (course == courseData) {
            setOpen(open == true ? false : true);
          } else {
            setCourse(courseData);
            setOpen(true);
          }
        }}
        className={cn(
          "px-4 py-2 shadow-md rounded-md border-2 border-primary/15 bg-primary/5 hover:cursor-pointer transition w-[150px] h-[50px] flex justify-center items-center",
          course == courseData && open && "bg-teal-50/30 scale-110",
        )}
      >
        <div className="text-lg font-bold">{data.code}</div>

        <Handle
          type="target"
          position={Position.Top}
          className="w-2 !bg-teal-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-2 !bg-teal-500"
        />
      </div>
    </>
  );
}

export default memo(CourseNode);
