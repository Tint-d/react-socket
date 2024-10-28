import { Checkbox } from "@/components/ui/checkbox";

interface HeaderPropsType {
  table: any;
  data?: any;
  setSelectIds?: (x: any) => void;
}

interface CellPropsType {
  row: any;
  setSelectIds?: (x: any) => void;
}

export const HeaderSelect = ({
  table,
  data,
  setSelectIds,
}: HeaderPropsType) => {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => {
        table.toggleAllPageRowsSelected(!!value);

        console.log("data => ", data);

        if (!!value) {
          if (setSelectIds) {
            let ids: string[] = [];

            data?.forEach((dt: any) => {
              ids = [...ids, dt.id];
            });

            setSelectIds(ids);
          }
        } else {
          if (setSelectIds) {
            setSelectIds([]);
          }
        }
      }}
      aria-label="Select all"
      className="[state=checked]:!hidden"
      //   variant="primary"
    />
  );
};

export const CellSelect = ({ row, setSelectIds }: CellPropsType) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => {
        row.toggleSelected(!!value);

        if (setSelectIds) {
          const id = row?.original?.id;

          setSelectIds((ids: any) => {
            const isExist = ids?.includes(id);

            if (isExist) return ids?.filter((dt: string) => dt != id);
            return [...ids, id];
          });
        }
      }}
      aria-label="Select row"
      //   variant="primary"
    />
  );
};
