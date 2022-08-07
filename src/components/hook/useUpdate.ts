import { useCallback, useMemo, useState } from "react";

export function useUpdate() {
  const [count,setCount] = useState(0);
  return useMemo(() => ({forceUpdate:() => setCount(count+1)}),[count]);
}
