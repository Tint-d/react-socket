import { forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  items: any;
  isFetching: boolean;
  hasNextPage: boolean;
  text: string;
  customSelect?: boolean;
}

const MySelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      value,
      onChange,
      placeholder,
      items,
      isFetching,
      hasNextPage,
      text,
      customSelect = false,
    },
    ref
  ) => {
    return (
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="focus:ring-primary-500 w-full rounded-xl bg-white text-sm font-normal text-slate-500 placeholder:text-base placeholder:font-normal placeholder:text-greyscale-400 focus:border-opacity-100 focus:ring-2 focus:ring-opacity-50 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-offset-[0px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="h-auto">
          {items?.pages?.map((page: any, index: any) => (
            <div key={index}>
              {page.items.map((category: any) => (
                <SelectItem
                  key={`${category.id} ${index}`}
                  value={
                    customSelect ? String(category.id) : String(category.id)
                  }
                >
                  {category.name}
                </SelectItem>
              ))}
            </div>
          ))}
          <div ref={ref} className="py-2 text-center">
            {isFetching
              ? `Loading more ${text}...`
              : hasNextPage
              ? "Scroll to load more"
              : `No more ${text}...`}
          </div>
        </SelectContent>
      </Select>
    );
  }
);

export default MySelect;
