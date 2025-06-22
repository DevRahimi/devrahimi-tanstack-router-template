import type { BillCalculation, Person, SplitType } from "@/types";

export const calculateBill = (
  people: Person[],
  billAmount: number,
  vatPercentage: number,
  tipAmount: number,
  tipType: "percentage" | "fixed",
  splitType: SplitType
): BillCalculation => {
  if (people.length === 0) {
    return {
      subtotal: 0,
      vatAmount: 0,
      tipAmount: 0,
      totalAmount: 0,
      outstandingAmount: 0,
      perPersonBreakdown: [],
    };
  }

  const subtotal = billAmount;
  const vatAmount = (subtotal * vatPercentage) / 100;
  const calculatedTipAmount = tipType === "percentage" ? (subtotal * tipAmount) / 100 : tipAmount;
  const totalAmount = subtotal + vatAmount + calculatedTipAmount;

  let perPersonBreakdown;

  if (splitType === "equal") {
    const perPersonBase = subtotal / people.length;
    const perPersonVat = vatAmount / people.length;
    const perPersonTip = calculatedTipAmount / people.length;
    const perPersonTotal = totalAmount / people.length;

    perPersonBreakdown = people.map((person) => ({
      person,
      baseAmount: perPersonBase,
      vatAmount: perPersonVat,
      tipAmount: perPersonTip,
      totalAmount: perPersonTotal,
    }));
  } else {
    // Custom split
    const totalCustomAmounts = people.reduce((sum, person) => sum + (person.customAmount || 0), 0);

    if (totalCustomAmounts === 0) {
      // Fallback to equal split if no custom amounts set
      return calculateBill(people, billAmount, vatPercentage, tipAmount, tipType, "equal");
    }

    perPersonBreakdown = people.map((person) => {
      const customAmount = person.customAmount || 0;
      const proportion = customAmount / totalCustomAmounts;

      const personVat = vatAmount * proportion;
      const personTip = calculatedTipAmount * proportion;
      const personTotal = customAmount + personVat + personTip;

      return {
        person,
        baseAmount: customAmount,
        vatAmount: personVat,
        tipAmount: personTip,
        totalAmount: personTotal,
      };
    });
  }

  const outstandingAmount = totalAmount - perPersonBreakdown.reduce((sum, person) => sum + person.totalAmount, 0);

  return {
    subtotal,
    vatAmount,
    tipAmount: calculatedTipAmount,
    totalAmount,
    outstandingAmount,
    perPersonBreakdown,
  };
};
