import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import {
  faEdit,
  faEllipsisV,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

type MenuButtonProps = {
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};

export default function MenuButton({
  handleEditClick,
  handleDeleteClick,
}: MenuButtonProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const hideMenu = (event: MouseEvent) => {
    if (
      menuRef.current &&
      event.target instanceof Node &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    if (menuIsOpen) {
      document.addEventListener("click", hideMenu);
    } else {
      document.removeEventListener("click", hideMenu);
    }

    return () => document.removeEventListener("click", hideMenu);
  }, [menuIsOpen]);

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`absolute top-4 right-4 hover:bg-slate-200 p-2 w-10 h-10 -mr-2 rounded-full ${
          menuIsOpen && "bg-slate-200"
        }`}
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
      {menuIsOpen && (
        <div
          ref={menuRef}
          className="absolute right-2 top-16 z-10 shadow bg-slate-100 rounded-md text-slate-600 flex flex-col items-start "
        >
          <EditButton onClick={handleEditClick} />
          <DeleteButton onClick={handleDeleteClick} />
        </div>
      )}
    </>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-3 flex gap-2 items-center hover:bg-slate-200 w-full rounded-t-md"
    >
      <FontAwesomeIcon icon={faEdit} />
      Edit
    </button>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-3 flex gap-2 items-center hover:bg-slate-200 w-full rounded-b-md"
    >
      <FontAwesomeIcon icon={faTrash} />
      Delete
    </button>
  );
}
