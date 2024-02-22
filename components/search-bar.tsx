"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "./ui/input";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function SearchBar() {
  const [value, setValue] = React.useState("");
  const [query] = useDebounce(value, 1000);
  const handleChange = async (query: string) => {
    setValue(query);
  };
  const route = useRouter();
  const handleSearch = () => {
    route.push("/search" + (query ? `?q=${encodeURIComponent(query)}` : ""));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <Input
        type="search"
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search Movie"
      />
    </form>
  );
}
