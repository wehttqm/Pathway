import { memo, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useNodesContext } from "@/providers/useNodesProvider";

import courseCodes from "@/assets/courseCodes.json";
import programAreas from "@/assets/programAreas.json";

type CourseCodes = {
  [key: string]: string[];
};

type CourseNodeData = {
  code: string;
};

type CourseNodeProps = {
  data: CourseNodeData;
};

type CourseData = {
  name: string;
  description: string;
  prerequisites: string | CourseRule;
};

type CourseRule = {
  and?: (string | CourseRule)[];
  or?: (string | CourseRule)[];
};

async function getCourseData(areas: string[], code: string) {
  if (areas) {
    for (const area of areas) {
      try {
        const area_data = await import(`@/assets/programs/${area}.json`);
        for (const course of area_data.default) {
          if (course["name"].slice(0, 8) == code) {
            return course;
          }
        }
      } catch (error) {
        console.error("Error loading the JSON file:", error);
      }
    }
  }
  return null;
}

function CourseNode({ data }: CourseNodeProps) {
  // const doStuff = () => {
  //   const newNode = {
  //     id: "test",
  //     type: "custom",
  //     position: {
  //       x: 0,
  //       y: 0,
  //     },
  //     data: { code: "testing" },
  //     origin: [0, 0] as [number, number],
  //   };
  //   setNodes(nds => nds.concat(newNode));
  // };

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const { setNodes } = useNodesContext();

  useEffect(() => {
    const fetchCourseData = async () => {
      const typedCourseCodes: CourseCodes = courseCodes;
      const areas = typedCourseCodes[data.code.slice(0, 3)] || null;
      const course = await getCourseData(areas, data.code);
      setCourseData(course);
    };

    fetchCourseData();
  });

  return (
    <div
      onClick={() => {
        console.log(courseData?.prerequisites);
      }}
      className="px-4 py-2 shadow-md rounded-md border-2 border-primary/15 bg-primary/5 hover:cursor-pointer"
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
  );
}

export default memo(CourseNode);
