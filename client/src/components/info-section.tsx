import { motion } from "motion/react";

export const InfoSection = ({
  scrollAreaRef,
}: {
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="min-h-screen mt-20">
      <motion.div
        className="flex justify-center"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">
            Discover Courses Based on your Interests
          </span>
          <span className="text-center text-2xl w-3/5 mt-2">
            No more digging through endless course catalogs. Simply type in your
            interests or field of study, and our AI will recommend courses that
            fit your needs.
          </span>
        </div>
      </motion.div>
      <motion.div
        className="flex justify-center mt-30"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">
            Visualize Your Course Pathway
          </span>
          <span className="text-center text-2xl mt-2">
            Use our interactive visualizer to organize your courses in a way
            that makes sense to you.
          </span>
        </div>
      </motion.div>
      <motion.div
        className="flex justify-center mt-30"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">
            Know What Courses You Need First
          </span>
          <span className="text-center text-2xl mt-2 w-3/5">
            Don’t worry about missing prerequisites. Pathway automatically
            highlights the set of possible prerequisites for each course,
            ensuring you know exactly what you need to take beforehand.
          </span>
        </div>
      </motion.div>
      <motion.div
        className="flex justify-center mt-30"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">
            Discover Interesting Courses
          </span>
          <span className="text-center text-2xl mt-2 w-3/5">
            Pathway uses AI to find courses that align with your interests,
            ensuring you discover the most relevant options for your academic
            and career goals. It helps prevent the common issue of missing out
            on courses that might spark your passion.
          </span>
        </div>
      </motion.div>
      <motion.div
        onClick={() => {
          scrollAreaRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex justify-center mt-30"
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 rounded-full border-2 border-primary/15 bg-primary/5 hover:cursor-pointer">
          <span>Try Pathway for free </span>
          <span className="underline">(no sign-up required!)</span>
        </div>
      </motion.div>
    </div>
  );
};
