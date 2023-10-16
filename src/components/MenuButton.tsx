import {
  faEdit,
  faEllipsisV,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

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

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    toggleMenu();
  };

  const menuRef = useRef<HTMLDivElement>(null);
  // Enables closing of menu button by clicking outside of it
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
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={handleClick}
          className={`hover:bg-slate-200 p-2 w-10 h-10 -mr-2 rounded-full ${
            menuIsOpen && "bg-slate-200"
          }`}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        {menuIsOpen && (
          <>
            <div className="fixed w-screen h-screen left-0 top-0 z-10"></div> 
            <div
              ref={menuRef}
              className="z-10 shadow bg-slate-100 rounded-md text-slate-600 flex flex-col items-start "
            >
              <EditButton onClick={handleEditClick} />
              <DeleteButton onClick={handleDeleteClick} />
            </div>
          </>
        )}
      </div>
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
  const [isPending, setIsPending] = useState(false);
  const handleClick = () => {
    setIsPending(true);
    onClick();
  };
  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className={`p-3 flex gap-2 items-center hover:bg-slate-200 w-full rounded-b-md ${
        isPending && "cursor-not-allowed"
      }`}
    >
      <FontAwesomeIcon icon={faTrash} />
      Delete
    </button>
  );
}
