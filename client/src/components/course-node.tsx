import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { CourseInfo } from "./course-info";

type CourseNodeData = {
  code: string;
};

type CourseNodeProps = {
  data: CourseNodeData;
};

function CourseNode({ data }: CourseNodeProps) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md border-2 border-primary/15 bg-primary/5 group">
      <div className="flex">
        <div className="group-hover:hidden text-lg font-bold">{data.code}</div>
        <div className="hidden group-hover:block transition">
          <CourseInfo code={data.code} />
        </div>
      </div>

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
