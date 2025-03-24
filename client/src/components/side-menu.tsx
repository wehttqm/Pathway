import { useSideMenuContext } from "@/providers/useSideMenuProvider";
import { PrerequisiteView } from "./prerequisite-view";
import { ScrollArea } from "./ui/scroll-area";

export const SideMenu = () => {
  const { course } = useSideMenuContext();
  return (
    <ScrollArea className="relative flex flex-col h-screen p-4">
      <div className="font-bold text-4xl font-ibm mb-4">{course?.name}</div>
      <div className="text-2xl mb-4">{course?.description}</div>
      <div className="">
        <PrerequisiteView prerequisites={course?.prerequisites} />
      </div>
    </ScrollArea>
  );
};
