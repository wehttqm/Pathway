import { useSideMenuContext } from "@/providers/useSideMenuProvider";
import { PrerequisiteView } from "./prerequisite-view";
import { ScrollArea } from "./ui/scroll-area";
import { useNodesContext } from "@/providers/useNodesProvider";

export const SideMenu = () => {
  const { course } = useSideMenuContext();
  const { addCourseToGraph } = useNodesContext();
  if (course) {
    return (
      <ScrollArea className="relative flex flex-col h-screen p-4">
        <div className="font-bold text-4xl font-ibm mb-4">{course.name}</div>
        <div className="text-2xl mb-4">{course.description}</div>
        <div className="">
          {typeof course.prerequisites === "string" ? (
            <div
              className="border-2 border-red-500 hover:cursor-pointer"
              onClick={() => {
                if (
                  typeof course.prerequisites === "string" &&
                  course.prerequisites.length < 10
                ) {
                  addCourseToGraph(course, course.prerequisites);
                }
              }}
            >
              {course.prerequisites}
            </div>
          ) : (
            <PrerequisiteView
              prerequisites={course.prerequisites}
              root={true}
            />
          )}
        </div>
      </ScrollArea>
    );
  }
};
