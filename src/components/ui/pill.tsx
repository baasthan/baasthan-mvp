import React from "react";

interface PillProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ElementType;
}
const Pill = ({ children, className, icon: Icon }: PillProps) => {
  return (
    <span>
      <div className="rounded-sm inline-flex items-center gap-2 px-2 py-1 text-center bg-secondary text-secondary-foreground text-xs touch-none">
        {Icon && <Icon size={15} />}
        {children}
      </div>
    </span>
  );
};

export default Pill;
