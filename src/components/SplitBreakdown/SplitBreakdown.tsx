import { useMemo } from "react";
import { useBillStore } from "@/store/bill-store";
import { calculateBill, formatCurrency } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import { Card, CardContent, Separator } from "@/components/ui";

const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export function SplitBreakdown() {
  const { people, billAmount, vatPercentage, tipAmount, tipType, splitType, country } = useBillStore();

  const showResult = useMemo(() => {
    const hasBillAndPeople = billAmount > 0 && people.length > 0 && people.every((person) => person.name.length > 0);
    if (!hasBillAndPeople) {
      return false;
    }

    if (splitType === "equal") {
      return true;
    }

    if (splitType === "custom") {
      return people.every((person) => person.customAmount != null);
    }

    return false;
  }, [billAmount, people, splitType]);

  const calculation = useMemo(() => {
    const res = calculateBill(people, billAmount, vatPercentage, tipAmount, tipType, splitType);
    return res;
  }, [people, billAmount, vatPercentage, tipAmount, tipType, splitType]);

  return (
    <AnimatePresence>
      {country && showResult && (
        <>
          <motion.div
            className="flex items-center justify-start mb-4"
            key="bill-breakdown-header"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <h2 className="font-semibold text-lg">Bill Summary</h2>
          </motion.div>

          {/* Total Summary */}
          <motion.div
            className="bg-muted/80 rounded-lg p-4 mb-6"
            key="bill-breakdown"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between col-span-1">
                <span>Subtotal:</span>
                <span>{formatCurrency(calculation.subtotal, country.currency[0])}</span>
              </div>
              <div className="flex justify-between col-span-1">
                <span>VAT:</span>
                <span>{formatCurrency(calculation.vatAmount, country.currency[0])}</span>
              </div>
              <div className="flex justify-between col-span-1">
                <span>Tip:</span>
                <span>{formatCurrency(calculation.tipAmount, country.currency[0])}</span>
              </div>
              <Separator />
              <div className="flex justify-between col-span-1 font-semibold text-lg">
                <span>Total:</span>
                <span className="text-primary">{formatCurrency(calculation.totalAmount, country.currency[0])}</span>
              </div>
              {calculation.outstandingAmount > 0 && (
                <>
                  <Separator />
                  <div className="flex justify-between col-span-1 font-semibold text-lg">
                    <span>Outstanding:</span>
                    <span className="text-warning">
                      {formatCurrency(calculation.outstandingAmount, country.currency[0])}
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Per Person Breakdown */}
          {calculation.perPersonBreakdown.length > 0 && (
            <>
              <motion.div
                className="flex items-center justify-start mb-4"
                key="bill-breakdown-header"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <h3 className="font-semibold">Per Person Breakdown</h3>
              </motion.div>
              <div className="space-y-3">
                {calculation.perPersonBreakdown.map(({ person, baseAmount, vatAmount, tipAmount, totalAmount }) => (
                  <motion.div
                    key={person.id}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <Card
                      key={person.id}
                      className="border-l-4 border-l-primary"
                    >
                      <CardContent className="px-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">{person.name}</h4>
                          <span className="text-lg font-semibold text-primary">
                            {formatCurrency(totalAmount, country.currency[0])}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>Base amount:</span>
                            <span>{formatCurrency(baseAmount, country.currency[0])}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>VAT:</span>
                            <span>{formatCurrency(vatAmount, country.currency[0])}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tip:</span>
                            <span>{formatCurrency(tipAmount, country.currency[0])}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
