export type Person = {
  id: string;
  name: string;
  customAmount?: number;
};

export type SplitType = "equal" | "custom";

export interface BillCalculation {
  subtotal: number;
  vatAmount: number;
  tipAmount: number;
  totalAmount: number;
  outstandingAmount: number;
  perPersonBreakdown: {
    person: Person;
    baseAmount: number;
    vatAmount: number;
    tipAmount: number;
    totalAmount: number;
  }[];
}
