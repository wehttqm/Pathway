import { fadeUpVariants } from "@/variants";
import { motion } from "motion/react";
import { useParams } from "react-router";
import CourseNode from "@/components/course-node";

import {
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

const nodeTypes = {
  custom: CourseNode,
};

import "@xyflow/react/dist/base.css";
import { useState } from "react";
import { Button } from "./ui/button";

export const CourseView = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

const Flow = () => {
  const { fitView } = useReactFlow();
  const [yOffset, setYOffset] = useState(0);

  const addDummyNode = () => {
    console.log(yOffset);
    const newNode = {
      id: yOffset.toString(),
      type: "custom",
      position: {
        x: 0,
        y: yOffset,
      },
      data: { code: yOffset.toString() },
      origin: [0, 0] as [number, number],
    };

    setNodes(nds => nds.concat(newNode));
    if (yOffset > 0) {
      setEdges(eds =>
        eds.concat({
          id: yOffset.toString() + "edge",
          source: (yOffset - 100).toString(),
          target: yOffset.toString(),
          type: "smoothstep",
          animated: true,
          style: { strokeWidth: 4 },
        }),
      );
    }

    setYOffset(yOffset + 100);
    fitView({ padding: 0.5 });
  };

  type NodeBase = {
    id: string;
    type: string;
    position: {
      x: number;
      y: number;
    };
    data: { code: string };
    origin: [number, number];
  };

  type EdgeBase = {
    id: string;
    source: string;
    target: string;
    type: string;
    animated?: boolean;
    style?: React.CSSProperties;
  };

  const [nodes, setNodes, onNodesChange] = useNodesState<NodeBase>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeBase>([]);

  document.body.classList.add("dark");
  const params = useParams();
  return (
    <div className="noise w-full h-screen flex p-4 overflow-hidden">
      <motion.div
        custom={0}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="w-1/5 h-full rounded-md"
      >
        <div className="asdf">{params.schoolId}</div>
        <Button onClick={() => addDummyNode()}>click me</Button>
      </motion.div>

      <motion.div
        custom={1}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="w-4/5 h-full bg-primary/5 rounded-md border-2 border-primary/15"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          colorMode="dark"
          className="!bg-transparent"
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </motion.div>
    </div>
  );
};
