import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useNodesContext } from "@/providers/useNodesProvider";

type CourseNodeData = {
  code: string;
};

type CourseNodeProps = {
  data: CourseNodeData;
};

function CourseNode({ data }: CourseNodeProps) {
  const { setNodes } = useNodesContext();

  const doStuff = () => {
    const newNode = {
      id: "test",
      type: "custom",
      position: {
        x: 0,
        y: 0,
      },
      data: { code: "testing" },
      origin: [0, 0] as [number, number],
    };
    setNodes(nds => nds.concat(newNode));
  };

  return (
    <div
      onClick={doStuff}
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
