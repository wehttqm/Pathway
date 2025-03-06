import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import React from "react";
import { Button } from "@/components/ui/button";

export const Topbar = () => {
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
    <div
      className="backdrop-filter 
  backdrop-blur-xs sticky top-0 
  bg-opacity-30 h-20 z-1000"
    >
      <div className="z-10 border-b-1 w-full flex items-center px-4 md:px-[30vh] h-full justify-between">
        <>
          <span className="text-2xl">Pathway</span>
          <Button
            variant="outline"
            className="font-normal bg-accent/50"
            onClick={() => setOpen(true)}
          >
            <span className="pr-10">Search program areas...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>J
            </kbd>
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem></CommandItem>
                <CommandItem></CommandItem>
                <CommandItem></CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem></CommandItem>
                <CommandItem></CommandItem>
                <CommandItem></CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </>
      </div>
    </div>
  );
};
