// src/components/FadeTransition.jsx
import { motion, AnimatePresence } from "framer-motion";

const FadeTransition = ({
  modeKey, // unique key (e.g. `${mode}-${step}`)
  children,
  duration = 0.28,
  offset = 20, // controls slide distance
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modeKey}
        initial={{ opacity: 0, x: offset }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -offset }}
        transition={{ duration }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeTransition;
