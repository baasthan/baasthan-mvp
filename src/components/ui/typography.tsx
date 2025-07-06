import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

type TextTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "pre" | "div";

type TextProps<T extends TextTags> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

function createTextComponent<T extends TextTags>(
  defaultTag: T,
  defaultClass: string
) {
  return forwardRef<ElementRef<T>, TextProps<T>>(function TextComponent(
    { as, className, ...props },
    ref
  ) {
    const Tag = as || defaultTag;
    return (
      <Tag
        ref={ref}
        className={cn(defaultClass, className)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      />
    );
  });
}

export const Typography = {
  h1: createTextComponent("h1", "text-4xl font-bold"),
  h2: createTextComponent("h2", "text-3xl font-semibold"),
  h3: createTextComponent(
    "h3",
    "scroll-m-20 text-2xl font-semibold tracking-tight"
  ),
  h4: createTextComponent("h4", "text-xl font-medium"),
  h5: createTextComponent("h5", "text-lg font-medium"),
  h6: createTextComponent("h6", "text-base font-medium"),
  p: createTextComponent("p", "text-base"),
  pre: createTextComponent("pre", "text-sm font-mono bg-muted p-4 rounded"),
  large: createTextComponent("div", "text-lg font-semibold"),
  small: createTextComponent("div", "text-sm leading-none font-medium"),
};

export default Typography;
