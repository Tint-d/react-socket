import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface PropsType {
  children: (field: any) => React.ReactNode;
  form: any;
  name: string;
  handleBlur?: any;
}

const MyFormItem: React.FC<PropsType> = ({
  children,
  form,
  name,
  handleBlur,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl onBlur={handleBlur} className="w-full">
            {children(field)}
          </FormControl>
          <FormMessage className="text-sm font-normal" />
        </FormItem>
      )}
    />
  );
};

export default MyFormItem;
