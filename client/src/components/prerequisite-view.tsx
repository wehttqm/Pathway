import { CourseRule } from "@/lib/types";
export const PrerequisiteView = ({
  prerequisites,
}: {
  prerequisites: CourseRule | undefined;
}) => {
  if (prerequisites) {
    return (
      <div className="rounded-md">
        {prerequisites.and?.map((prereq: CourseRule | string) => {
          if (typeof prereq === "string") {
            return <div key={prereq}>{prereq}</div>;
          } else {
            return (
              <PrerequisiteView
                key={JSON.stringify(prereq)}
                prerequisites={prereq}
              />
            );
          }
        })}
        {prerequisites.or?.map((prereq: CourseRule | string) => {
          if (typeof prereq === "string") {
            return <div key={prereq}>{prereq}</div>;
          } else {
            return (
              <PrerequisiteView
                key={JSON.stringify(prereq)}
                prerequisites={prereq}
              />
            );
          }
        })}
      </div>
    );
  }
};
