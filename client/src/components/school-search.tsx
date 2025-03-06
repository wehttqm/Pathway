import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React from "react";
import { Button } from "@/components/ui/button";

export const SchoolSearch = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="flex flex-row items-center text-nowrap ronded-lg px-4 py-6 rounded-full border-2 border-primary/15 bg-primary/5 text-xl hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <span className="pr-15">Search schools...</span>
        <kbd className=" inline-flex h-8 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Enter a school name..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>University of Toronto Mississauga</CommandItem>
            <CommandItem>University of Toronto St. George</CommandItem>
            <CommandItem>University of Toronto Scarborough</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
