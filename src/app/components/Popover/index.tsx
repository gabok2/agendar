import {
  Popover as HeadlessPopover,
  PopoverButton,
  PopoverPanel,
  PopoverProps,
} from "@headlessui/react";

interface Props extends PopoverProps {
  readonly children: React.ReactNode;

  readonly itens: {
    label: string;
    color: string;
  }[];
}

export function Popover({ children, itens, ...props }: Props) {
  return (
    <HeadlessPopover className="relative" {...props}>
      <PopoverButton className=" focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
        {children}
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        className="flex flex-col mt-2 space-y-2 bg-white shadow-lg rounded-lg p-4 pb-2 border border-zinc-100"
      >
        {itens && (
          <>
            {itens.map((item) => (
              <div key={item.label}>
                <span className={` ${item.color}`}>{item.label}</span>
              </div>
            ))}
          </>
        )}
      </PopoverPanel>
    </HeadlessPopover>
  );
}
