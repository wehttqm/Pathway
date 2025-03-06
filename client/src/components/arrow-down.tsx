import { ArrowDownIcon } from "lucide-react";
import { motion } from "motion/react";

export const ArrowDown = () => {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: [0, 10, 0],
      }}
      transition={{
        delay: 2,
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
      }}
    >
      <div className="p-4 rounded-full border-2 border-primary/15 bg-primary/5">
        <ArrowDownIcon />
      </div>
    </motion.div>
  );
};
