"use client";

import { useState, useEffect, FC } from "react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/useSearch";
import useIsMounted from "@/hooks/useIsMounted";

type SearchComponentProps = {};
const SearchComponent: FC<SearchComponentProps> = () => {
  const isMounted = useIsMounted();
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearchNotes);
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);
  const onSelectHandler = (id: string) => {
    router.push(`/documents/${id}`);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (!isMounted) return null;
  return (
    <CommandDialog onOpenChange={onClose} open={isOpen}>
      <Command className="rounded-lg border shadow-md md:min-w-[450px] max-w-[450px]">
        <CommandInput placeholder={`Search ${user?.fullName}'s SantraNotes`} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Notes">
            {documents?.map((self, index) => (
              <CommandItem
                key={index}
                value={`${self._id}-${self.title}`}
                onSelect={() => {
                  onSelectHandler(self._id);
                  // toggle();
                  // router.push(`/notes/${self.id}`);
                }}
              >
                {self.icon ? (
                  <p className={`mr-2 text-[18px]`}>{self.icon}</p>
                ) : (
                  <File className="h-4 w-4" />
                )}

                <CommandShortcut>{self.title}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SearchComponent;
