export type NodeBase = {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: { code: string };
  origin: [number, number];
};

export type EdgeBase = {
  id: string;
  source: string;
  target: string;
  type: string;
  animated?: boolean;
  style?: React.CSSProperties;
};
