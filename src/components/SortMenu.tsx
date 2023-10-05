"use client";

import {
  faFire,
  faRocket,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SortMenu() {
  return (
    <div className="bg-white shadow rounded-xl p-2 flex gap-4">
      <SortButton>
        <FontAwesomeIcon icon={faFire} />
        Hot
      </SortButton>
      <SortButton>
        <FontAwesomeIcon icon={faStarOfLife} />
        New
      </SortButton>
      <SortButton>
        <FontAwesomeIcon icon={faRocket} />
        Top
      </SortButton>
    </div>
  );
}

function SortButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex gap-2 items-center hover:bg-sky-200 hover:text-sky-600 p-2 rounded-full">
      {children}
    </button>
  );
}
