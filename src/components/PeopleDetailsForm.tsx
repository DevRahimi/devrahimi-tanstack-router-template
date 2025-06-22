import { useState } from "react";
import { useBillStore } from "@/store/bill-store";
import { cn } from "@/utils";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Button, Input } from "@/components/ui";

export function PeopleDetailsForm() {
  const { people, splitType, country, addPerson, removePerson, updatePersonName, setSplitType, setCustomAmount } =
    useBillStore();

  const [newPersonName, setNewPersonName] = useState("");

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      addPerson(newPersonName.trim());
      setNewPersonName("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 sm:hidden">
        <Button
          variant={splitType === "equal" ? "default" : "outline"}
          size="sm"
          onClick={() => setSplitType("equal")}
          className="flex-1"
        >
          Equal Split
        </Button>
        <Button
          variant={splitType === "custom" ? "default" : "outline"}
          size="sm"
          onClick={() => setSplitType("custom")}
          className="flex-1"
        >
          Custom Split
        </Button>
      </div>

      <div className="space-y-3">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
          >
            <Input
              value={person.name}
              onChange={(e) => updatePersonName(person.id, e.target.value)}
              placeholder="Name"
              className="flex-1 bg-card"
            />

            {splitType === "custom" && (
              <div className="relative">
                {country && (
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                    {country.currency[0]}
                  </span>
                )}
                <Input
                  type="number"
                  value={person.customAmount || ""}
                  onChange={(e) => setCustomAmount(person.id, Number(e.target.value))}
                  className={cn("w-32 bg-card", !!country ? "pl-12" : "")} // eslint-disable-line
                  placeholder="Amount"
                  step="0.01"
                  min={0}
                />
              </div>
            )}

            {people.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removePerson(person.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newPersonName}
          onChange={(e) => setNewPersonName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddPerson()}
          placeholder="Add person..."
          className="flex-1 bg-card"
        />
        <Button
          onClick={handleAddPerson}
          disabled={!newPersonName}
        >
          <PlusIcon className="h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  );
}
