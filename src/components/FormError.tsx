import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function FormError({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-rose-200 text-rose-500 rounded-md p-2 flex gap-2 items-center">
      <FontAwesomeIcon icon={faExclamationCircle} />
      {children}
    </span>
  );
}
