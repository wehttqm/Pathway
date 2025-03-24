"use client";

import React, { createContext, useContext } from "react";
import { NodeBase, EdgeBase } from "../lib/types";
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
};

export const NodesContext = createContext<NodesContext | null>(null);

export function NodesProvider({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeBase>([
    {
      id: "CSC258H5",
      type: "custom",
      position: {
        x: 0,
        y: 0,
      },
      data: { code: "CSC369H5" },
      origin: [0, 0] as [number, number],
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeBase>([]);

  return (
    <NodesContext.Provider
      value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange }}
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
