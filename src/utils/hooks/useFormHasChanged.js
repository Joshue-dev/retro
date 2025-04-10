import { useEffect, useState } from "react";

const useFormHasChanged = (initialValues, currentValues) => {
  const [hasChanged, setHasChanged] = useState(false);
  useEffect(() => {
    const isChanged = Object.keys(initialValues).some(
      (key) => initialValues[key] !== currentValues[key]
    );
    setHasChanged(isChanged);
  }, [initialValues, currentValues]);
  return hasChanged;
};

export default useFormHasChanged