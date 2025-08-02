import { Checkbox } from "@/components/ui/checkbox";

export const renderCheckboxGroup = <T extends string>(
  options: T[],
  selected: T[] | undefined,
  onChange: (newVal: T[]) => void,
  enumMap: Record<T, string>,
  groupIdPrefix: string
) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {options.map((opt) => {
        const isChecked = selected?.includes(opt);
        return (
          <label
            key={opt}
            className={`
                relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${
                  isChecked
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
          >
            <Checkbox
              id={`${groupIdPrefix}-${opt}`}
              checked={isChecked}
              onCheckedChange={(checked) => {
                const newValue = checked
                  ? [...(selected || []), opt]
                  : (selected || []).filter((val) => val !== opt);
                onChange(newValue);
              }}
              className="mr-3"
            />
            <span className="text-sm font-medium text-gray-900">
              {enumMap[opt]}
            </span>
          </label>
        );
      })}
    </div>
  );
};
