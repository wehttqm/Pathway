"use client";

import React, { createContext, useCallback, useContext } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import { NodeBase, EdgeBase, CourseData } from "../lib/types";
import {
  NodeChange,
  EdgeChange,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

type NodesContext = {
  nodes: NodeBase[];
  setNodes: React.Dispatch<React.SetStateAction<NodeBase[]>>;
  onNodesChange: (changes: NodeChange<NodeBase>[]) => void;
  edges: EdgeBase[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeBase[]>>;
  onEdgesChange: (changes: EdgeChange<EdgeBase>[]) => void;
  addCourseToGraph: (course: CourseData | null, code: string) => void;
};

const elk = new ELK();
const elkOptions = {
  "elk.algorithm": "mrtree",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
};

const getLayoutedElements = (
  nodes: NodeBase[],
  edges: EdgeBase[],
  options: { "elk.direction"?: string } = {},
) => {
  console.log(nodes);
  console.log(edges);
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map(node => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges.map(edge => ({
      ...edge,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  return elk
    .layout(graph)
    .then(layoutedGraph => ({
      nodes: (layoutedGraph.children ?? []).map(node => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields. Provide default values for x and y.
        position: { x: node.x ?? 0, y: node.y ?? 0 },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

export const NodesContext = createContext<NodesContext | null>(null);

export function NodesProvider({ children }: { children: React.ReactNode }) {
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeBase>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeBase>([
    {
      id: "CSC376H5",
      type: "custom",
      position: {
        x: 0,
        y: 0,
      },
      data: { code: "CSC376H5", school: "utm" },
      origin: [0, 0] as [number, number],
    },
  ]);

  const onLayout = useCallback(
    ({
      direction,
      newNodes,
      newEdges,
    }: {
      direction: string;
      newNodes: NodeBase[];
      newEdges: EdgeBase[];
    }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = newNodes;
      const es = newEdges;

      getLayoutedElements(ns, es, opts).then(result => {
        if (result) {
          const { nodes: layoutedNodes, edges: layoutedEdges } = result;
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
        }
      });
    },
    [nodes, edges],
  );

  function addCourseToGraph(course: CourseData | null, code: string) {
    if (course && nodes.every(node => node.data.code !== code)) {
      const oldNodes = nodes;
      const oldEdges = edges;

      const newNodes = oldNodes.concat({
        id: code,
        type: "custom",
        position: {
          x: 0,
          y: 0,
        },
        data: { code: code, school: "utm" },
        origin: [0, 0] as [number, number],
      });

      const newEdges = oldEdges.concat({
        id: course?.name.slice(0, 8).concat(code),
        source: course?.name.slice(0, 8),
        target: code,
        type: "default",
        animated: true,
        style: { strokeWidth: 4 },
      });

      onLayout({ direction: "DOWN", newNodes, newEdges });
    }
  }

  return (
    <NodesContext.Provider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        addCourseToGraph,
      }}
    >
      {children}
    </NodesContext.Provider>
  );
}

export const useNodesContext = () => {
  const context = useContext(NodesContext);
  if (!context) {
    throw new Error(
      "useNodesContext must be used within a NodesContextProvider",
    );
  }
  return context;
};
