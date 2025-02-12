import { Input } from '@/components/ui/input';

interface LabeledInfoFieldProps {
  label: string;
  value: string;
  isEditable?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function LabeledInfoField({
  label,
  value,
  isEditable = false,
  onChange,
  placeholder,
  disabled = false,
}: LabeledInfoFieldProps) {
  return (
    <div className="h-[70px] mb-2 flex items-center justify-between px-8 border border-[#d6d6d6] rounded-lg">
      <span className="shrink-0 mr-4">{label}</span>
      {isEditable ? (
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="max-w-[250px] font-light text-right bg-transparent border-none outline-none"
        />
      ) : (
        <span className="max-w-[250px] font-light truncate text-right">
          {value}
        </span>
      )}
    </div>
  );
}
