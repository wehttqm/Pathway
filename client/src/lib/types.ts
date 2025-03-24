export type NodeBase = {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: CourseNodeData;
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

export type CourseData = {
  name: string;
  description: string;
  prerequisites: CourseRule;
};

export type CourseRule = {
  and?: (string | CourseRule)[];
  or?: (string | CourseRule)[];
};

export type CourseCodes = {
  [key: string]: string[];
};

export type CourseNodeData = {
  code: string;
  school: string;
};

export type CourseNodeProps = {
  data: CourseNodeData;
};
