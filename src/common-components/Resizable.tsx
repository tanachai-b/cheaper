import { CSSProperties, ReactNode, RefObject, useEffect, useRef } from "react";

export function Resizable({
  divRef,
  className,
  style,
  children,
  onResize,
}: {
  divRef?: RefObject<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onResize: (boundingClientRect: DOMRect) => void;
}) {
  const inRef = useRef<HTMLDivElement>(null);
  const ref = divRef ?? inRef;

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return;
      onResize(ref.current.getBoundingClientRect());
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref.current, onResize]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
