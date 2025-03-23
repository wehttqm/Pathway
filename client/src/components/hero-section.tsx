/// <reference types="vite-plugin-svgr/client" />
import { LibraryBig } from "lucide-react";
import { motion } from "motion/react";
import PathwayLogo from "@/assets/pathway.svg?react";
import { SchoolSearch } from "@/components/school-search";
import { ArrowDown } from "./arrow-down";
import { fadeUpVariants } from "@/variants";

export const HeroSection = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      <motion.div
        custom={1}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="mb-2"
      >
        <div className="flex flex-row items-center space-x-2 text-nowrap ronded-lg px-3 py-2 rounded-full border-2 border-primary/15 bg-primary/5">
          <div className="bg-blue-400 p-2 rounded-full">
            <LibraryBig className="w-6 h-6" />
          </div>
          <span className="text-xl">Node-based Course Planner</span>
        </div>
      </motion.div>
      <motion.div
        custom={2}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className=""
      >
        <div className="font-ibm">
          <PathwayLogo width="600" height="300" />
        </div>
      </motion.div>
      <motion.div
        custom={3}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <span className="text-2xl">Unlock your Perfect Learning Pathway</span>
      </motion.div>
      <motion.div
        custom={4}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="mb-2"
      >
        <SchoolSearch />
      </motion.div>
      <motion.div
        custom={14}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 mb-15"
      >
        <ArrowDown />
      </motion.div>
    </div>
  );
};
