interface DividerProps {
  className?: string;
  top?: string;
  bottom?: string;
}

export const Divider = ({ bottom, top, className }: DividerProps) => (
  <div className={` w-full h-px bg-gray ${className} ${top} ${bottom}`} />
);
