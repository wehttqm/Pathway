"use client";

import { CourseData } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

type SideMenuContext = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  course: CourseData | null;
  setCourse: React.Dispatch<React.SetStateAction<CourseData | null>>;
};

export const SideMenuContext = createContext<SideMenuContext | null>(null);

export function SideMenuProvider({ children }: { children: React.ReactNode }) {
  const [course, setCourse] = useState<CourseData | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <SideMenuContext.Provider value={{ course, setCourse, open, setOpen }}>
      {children}
    </SideMenuContext.Provider>
  );
}

export const useSideMenuContext = () => {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error(
      "useSideMenuContext must be used within a SideMenuContextProvider",
    );
  }
  return context;
};
