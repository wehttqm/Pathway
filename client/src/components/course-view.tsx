import { fadeUpVariants } from "@/variants";
import { motion } from "motion/react";
import { useParams } from "react-router";
import CourseNode from "@/components/course-node";
import schools from "@/assets/schools.json";

import {
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";

const nodeTypes = {
  custom: CourseNode,
};

import "@xyflow/react/dist/base.css";
import { Button } from "./ui/button";
import { useNodesContext } from "@/providers/useNodesProvider";
import { useSideMenuContext } from "@/providers/useSideMenuProvider";
import { SideMenu } from "./side-menu";
import { cn } from "@/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect } from "react";

export const CourseView = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

const Flow = () => {
  const ReactFlowInstance = useReactFlow();
  const { open } = useSideMenuContext();
  const { nodes, onNodesChange, edges, onEdgesChange } = useNodesContext();

  useEffect(() => {
    setTimeout(() => ReactFlowInstance.fitView(), 0);
  }, [nodes.length]);

  document.body.classList.add("dark");
  const params = useParams();
  if (params.schoolId && schools.includes(params.schoolId)) {
    return (
      <div className="noise w-full h-screen flex space-x-4 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="w-full">
          <ResizablePanel className="w-full" defaultSize={20}>
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="h-full rounded-md relative"
            >
              <div
                className={cn("opacity-0 transition", open && "opacity-100")}
              >
                <SideMenu />
              </div>
              <div
                className={cn(
                  "absolute top-0 opacity-100 transition",
                  open && "opacity-0",
                )}
              >
                <div className="asdf">{params.schoolId}</div>
                <Button onClick={() => {}}>click me</Button>
              </div>
            </motion.div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="w-full p-4 pl-0">
            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="h-full bg-primary/5 rounded-md border-2 border-primary/15"
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
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-screen flex justify-center items-center noise">
        Cannot find school {params?.schoolId}
      </div>
    );
  }
};
