import { CourseRule } from "@/lib/types";
import { useSideMenuContext } from "@/providers/useSideMenuProvider";
import { useNodesContext } from "@/providers/useNodesProvider";

export const PrerequisiteView = ({
  prerequisites,
}: {
  prerequisites: CourseRule | undefined;
  root: boolean;
  f?: (value: number) => void;
}) => {
  const { addCourseToGraph } = useNodesContext();
  const { course } = useSideMenuContext();

  if (prerequisites) {
    return (
      <div className="flex flex-col border ">
        {prerequisites.and?.map((prereq: CourseRule | string) => {
          return (
            <div
              key={JSON.stringify(prereq)}
              className="border-red-500 mb-2 border-2"
            >
              {typeof prereq === "string" ? (
                <div
                  className="flex flex-col hover:cursor-pointer"
                  onClick={() => addCourseToGraph(course, prereq)}
                >
                  <span>{prereq}</span>
                </div>
              ) : (
                <div className="">
                  <PrerequisiteView prerequisites={prereq} root={false} />
                </div>
              )}
            </div>
          );
        })}
        {prerequisites.or?.map((prereq: CourseRule | string) => {
          return (
            <div key={JSON.stringify(prereq)} className="bg-green-500">
              {typeof prereq === "string" ? (
                <div className="flex flex-col">
                  <span>{prereq}</span>
                </div>
              ) : (
                <div className="">
                  <PrerequisiteView prerequisites={prereq} root={false} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};
