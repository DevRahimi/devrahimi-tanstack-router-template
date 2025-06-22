import type { Person, SplitType } from "@/types";
import type { ICountryData } from "countries-list";
import { create } from "zustand";

interface BillStoreState {
  people: Person[];
  billAmount: number;
  vatPercentage: number;
  tipAmount: number;
  tipType: "percentage" | "fixed";
  splitType: SplitType;
  country: ICountryData | null;
}

interface BillStoreActions {
  addPerson: (name: string) => void;
  removePerson: (id: string) => void;
  updatePersonName: (id: string, name: string) => void;
  setBillAmount: (amount: number) => void;
  setVatPercentage: (percentage: number) => void;
  setTipAmount: (amount: number) => void;
  setTipType: (type: "percentage" | "fixed") => void;
  setSplitType: (type: SplitType) => void;
  setCustomAmount: (id: string, amount: number) => void;
  setCountry: (country: ICountryData | null) => void;
  reset: () => void;
}

type BillStore = BillStoreState & BillStoreActions;

export const useBillStore = create<BillStore>((set) => ({
  people: [
    { id: "1", name: "A" },
    { id: "2", name: "B" },
    { id: "3", name: "C" },
    { id: "4", name: "D" },
    { id: "5", name: "E" },
  ],
  billAmount: 100,
  vatPercentage: 10,
  tipAmount: 20,
  tipType: "percentage",
  splitType: "equal",
  country: null,

  addPerson: (name) =>
    set((state) => ({
      people: [
        ...state.people,
        {
          id: `${state.people.length + 1}`,
          name: name || `Person ${state.people.length + 1}`,
        },
      ],
    })),

  removePerson: (id) =>
    set((state) => ({
      people: state.people.filter((person) => person.id !== id),
    })),

  updatePersonName: (id, name) =>
    set((state) => ({
      people: state.people.map((person) => (person.id === id ? { ...person, name } : person)),
    })),

  setBillAmount: (amount) => set({ billAmount: Math.max(0, amount) }),
  setVatPercentage: (percentage) => set({ vatPercentage: Math.max(0, percentage) }),
  setTipAmount: (amount) => set({ tipAmount: Math.max(0, amount) }),
  setTipType: (type) => set({ tipType: type }),
  setSplitType: (type) => set({ splitType: type }),

  setCustomAmount: (id, amount) =>
    set((state) => ({
      people: state.people.map((person) =>
        person.id === id ? { ...person, customAmount: Math.max(0, amount) } : person
      ),
    })),

  setCountry: (country) => set({ country }),

  reset: () =>
    set((state) => ({
      people: [{ id: "1", name: "" }],
      billAmount: 0,
      vatPercentage: 0,
      tipAmount: 0,
      tipType: "percentage",
      splitType: "equal",
      country: state.country,
    })),
}));
