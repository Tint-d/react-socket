import { useState, forwardRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ComboBoxProps<T> {
  items: T[];
  value: string;
  onChange: (value: string) => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  placeholder: string;
  labelKey: keyof T;
  valueKey: keyof T;
  fetchMoreText?: string;
}

const MyComboBox = forwardRef<HTMLDivElement, ComboBoxProps<any>>(
  (
    {
      items,
      value,
      onChange,
      isFetchingNextPage,
      hasNextPage,
      placeholder,
      labelKey,
      valueKey,
      fetchMoreText = "Loading more...",
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    // console.log("items =>", items);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {value
              ? items.find((item) => String(item[valueKey]) === value)?.[
                  labelKey
                ]
              : placeholder}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${placeholder.toLowerCase()}...`}
            />
            <CommandList>
              <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={String(item[valueKey])}
                    onSelect={() => onChange(String(item[valueKey]))}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        String(item[valueKey]) === value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item[labelKey]}
                  </CommandItem>
                ))}
              </CommandGroup>
              <div ref={ref} className="py-2 text-center">
                {isFetchingNextPage
                  ? fetchMoreText
                  : hasNextPage
                  ? "Scroll to load more"
                  : ``}
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

export default MyComboBox;
