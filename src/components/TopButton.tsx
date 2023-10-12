'use client'

import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopButton() {
  const handleClick = () => {
    document.documentElement.scrollTop = 0
  }
  return (
    <button onClick={handleClick} className="fixed right-2 bottom-2 w-10 h-10 text-white bg-sky-500 shadow rounded-full hover:bg-sky-400">
      <FontAwesomeIcon icon={faChevronUp} />
    </button>
  );
}
