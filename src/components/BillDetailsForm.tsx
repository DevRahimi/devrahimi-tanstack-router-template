import { type JSX, useMemo, useState } from "react";
import { useBillStore } from "@/store/bill-store";
import { getCountryDataList, getEmojiFlag, type ICountryData } from "countries-list";
import { ChevronDownIcon, ChevronUpIcon, GlobeIcon } from "lucide-react";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

export function BillDetailsForm() {
  const {
    billAmount,
    vatPercentage,
    tipAmount,
    tipType,
    country,
    setBillAmount,
    setVatPercentage,
    setTipAmount,
    setTipType,
    setCountry,
  } = useBillStore();

  const [currencyPopoverOpen, setCurrencyPopoverOpen] = useState(false);

  const handleSelectCountry = (country: ICountryData) => {
    localStorage.setItem("previously-selected-country", JSON.stringify(country));
    setCountry(country);
    setCurrencyPopoverOpen(false);
  };

  const handleSetVatPercentage = (value: string) => {
    let parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      parsedValue = 0;
    } else if (parseInt(value) < 0) {
      parsedValue = 0;
    } else if (parseInt(value) > 100) {
      parsedValue = 100;
    }

    setVatPercentage(parsedValue);
    localStorage.setItem("previous-vat-value", JSON.stringify(parsedValue));
  };

  const renderCountryLabel = (country: ICountryData): JSX.Element => {
    return (
      <div className="flex w-full flex-row items-center justify-start gap-4">
        <div>
          {getEmojiFlag(country.iso2)}&nbsp;&nbsp;{country.name}&nbsp;&#8212;&nbsp;
          {country.currency[0]}
        </div>
      </div>
    );
  };

  const allCountries = useMemo(() => {
    const countries = getCountryDataList()
      .filter((c) => c.currency.length > 0)
      .filter((c) => c.iso3 !== "ISR");
    return countries;
  }, []);

  return (
    <div className="space-y-4">
      {/* Currency Selection */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <GlobeIcon className="h-4 w-4" />
          Currency
        </Label>
        <Popover
          open={currencyPopoverOpen}
          onOpenChange={setCurrencyPopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={currencyPopoverOpen}
              className="w-full justify-between"
            >
              {!country && <span>Select a currency</span>}
              {country && renderCountryLabel(country)}

              {currencyPopoverOpen ? (
                <ChevronUpIcon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full p-0 max-w-fit"
            align="start"
          >
            <Command className="w-full max-w-fit">
              <CommandInput
                placeholder="Search by currency code..."
                maxLength={3}
                inputMode="text"
              />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {allCountries.map((country) =>
                    country.currency.map((currency, idx) => (
                      <CommandItem
                        key={idx}
                        value={currency}
                        onSelect={() => handleSelectCountry(country)}
                        className="cursor-pointer max-w-[340px]"
                      >
                        {/* <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            country?.currency[0] === c.currency[0] ? "opacity-100" : "opacity-0"
                          )}
                        /> */}
                        {renderCountryLabel(country)}
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Bill Amount and VAT */}
      <div className="space-y-2">
        <Label>Bill Amount {country && <span>{country.currency[0]}</span>}</Label>
        <Input
          type="number"
          value={billAmount || ""}
          onChange={(e) => setBillAmount(Number(e.target.value))}
          placeholder="0.00"
          step="1"
        />
      </div>

      <div className="space-y-2">
        <Label>VAT (%)</Label>
        <Input
          type="number"
          value={vatPercentage || ""}
          onChange={(e) => handleSetVatPercentage(e.target.value)}
          placeholder="0"
          step="0.1"
          min={0}
          max={100}
        />
      </div>

      {/* Tip */}
      <div className="flex items-center gap-4 w-full">
        <div className="space-y-2">
          <Label>Tip Type</Label>
          <Select
            value={tipType}
            onValueChange={(value: "percentage" | "fixed") => setTipType(value)}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
              <SelectItem value="fixed">Fixed {country && <span>({country.currency[0]})</span>}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full">
          <Label>Tip {tipType === "percentage" ? "(%)" : country ? `(${country.currency[0]})` : ""}</Label>
          <Input
            type="number"
            value={tipAmount || ""}
            onChange={(e) => setTipAmount(Number(e.target.value))}
            placeholder="0"
            step={tipType === "percentage" ? "0.1" : "1"}
          />
        </div>
      </div>
    </div>
  );
}
