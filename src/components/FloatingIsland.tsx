import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppMenu } from "./AppMenu";
import { BillDetailsForm } from "./BillDetailsForm";
import { PeopleDetailsForm } from "./PeopleDetailsForm";
import { ResponsiveDrawer } from "./ResponsiveDrawer";

interface FloatingIslandProps {
  handleReset: () => void;
}

export function FloatingIsland({ handleReset }: FloatingIslandProps) {
  const [show, setShow] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.pageYOffset;
    const onScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 64;
      const y = window.pageYOffset;

      if (y < lastY.current) {
        // scrolling up
        setShow(true);
      } else if (atBottom) {
        // reached bottom
        setShow(true);
      } else if (y > lastY.current) {
        // scrolling down
        setShow(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="floating-island"
          className="flex items-center justify-center gap-3 rounded-md border border-border/80 bg-card/40 p-4 shadow-xl backdrop-blur-xs md:w-fit z-50 fixed bottom-8 left-1/2 transform -translate-x-1/2 w-fit"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ResponsiveDrawer
            triggerButtonText="Bill Details"
            title="Bill Details"
            description="Currency, total amount, VAT, tip details"
            content={<BillDetailsForm />}
          />
          <ResponsiveDrawer
            triggerButtonText="People Details"
            title="People Details"
            description="People to split the bill with"
            content={<PeopleDetailsForm />}
          />
          <AppMenu handleReset={handleReset} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
