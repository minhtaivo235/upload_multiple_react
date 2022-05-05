import { useState } from "react";

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value: boolean | null = null): void {
    setValue((currentValue) => (value ? value : !currentValue));
  }

  return { value: value, toggleValue };
}
