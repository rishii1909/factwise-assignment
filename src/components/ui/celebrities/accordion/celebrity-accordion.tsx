"use client";
import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";

import celebrities from "@/mock/celebrities.json";
import { CelebrityAccordionItem } from "./celebrity-accordion-item";
import { Celebrity } from "@/types";
import { cloneDeep, remove } from "lodash";

import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const CelebrityAccordion = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [celebritiesList, setCelebritiesList] = useState(celebrities);

  const filterCeleBritiesList = () => {
    const cleanedQuery = searchQuery.toLowerCase().trim();
    if (!cleanedQuery) return celebritiesList;

    const filteredCelebrities = celebritiesList.filter(
      (c) =>
        c.first.toLowerCase().includes(cleanedQuery) ||
        c.last.toLowerCase().includes(cleanedQuery)
    );

    return filteredCelebrities;
  };

  const filteredCelebritiesList = filterCeleBritiesList();

  const findCelebrityIndex = (celebrity: Celebrity) => {
    const index = celebritiesList.findIndex((c) => c.id === celebrity.id);
    return index;
  };

  const handleCelebrityEdit = (celebrity: Celebrity) => {
    const index = findCelebrityIndex(celebrity);
    if (index < 0) return;

    const updatedCelebritiesList = cloneDeep(celebritiesList);
    updatedCelebritiesList[index] = celebrity;

    setCelebritiesList(updatedCelebritiesList);
  };

  const handleCelebrityDelete = (celebrity: Celebrity) => {
    const index = findCelebrityIndex(celebrity);
    if (index < 0) return;

    const updatedCelebritiesList = remove(
      celebritiesList,
      (c) => c.id !== celebrity.id
    );

    setCelebritiesList(updatedCelebritiesList);
  };

  return (
    <>
      <div className="relative w-full mb-4 mt-12">
        <Input
          className="pl-9"
          placeholder="Search user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <MagnifyingGlassIcon className="absolute left-0 top-0 m-2 h-5 w-5 text-muted-foreground" />
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-[480px] flex flex-col space-y-3 border-zinc-300"
      >
        {filteredCelebritiesList.map((celebrity, index) => {
          return (
            <CelebrityAccordionItem
              key={index}
              celebrity={celebrity}
              onEdit={handleCelebrityEdit}
              onDelete={handleCelebrityDelete}
            />
          );
        })}
      </Accordion>
    </>
  );
};
