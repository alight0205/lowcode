import { useCallback, useRef } from "react";

// 需要得到一个不变的函数引用，但是这个不变的函数执行的时候，传递的是最新的值
export function useCallbackRef<FN extends ((...args: any[]) => any)>(fn:FN):FN {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  return useCallback(((...args:any[]) => fnRef.current(...args) ) as FN,[])
}