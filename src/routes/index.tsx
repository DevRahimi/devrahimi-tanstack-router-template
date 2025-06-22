import { useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useBillStore } from "@/store/bill-store";
import { FloatingIsland } from "@/components/FloatingIsland";
import { SplitBreakdown } from "@/components/SplitBreakdown/SplitBreakdown";

// import logo from "../logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { setCountry, setVatPercentage, reset } = useBillStore();

  const setDefaults = useCallback(() => {
    const previouslySelectedCountry = JSON.parse(localStorage.getItem("previously-selected-country") || "null");
    const previousVatValue = JSON.parse(localStorage.getItem("previous-vat-value") || "null");

    setCountry(previouslySelectedCountry);
    if (previousVatValue) {
      setVatPercentage(previousVatValue);
    }
  }, [setCountry, setVatPercentage]);

  const handleReset = () => {
    reset();
    setDefaults();
  };

  useEffect(() => {
    setDefaults();
  }, [setDefaults]);

  return (
    <div className="min-h-screen container mx-auto w-full max-w-xl p-6">
      <div className="mb-28">
        <SplitBreakdown />

        <FloatingIsland handleReset={handleReset} />
      </div>
    </div>
  );
}
