import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

type ContextMenuProps = {
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};

export default function ContextMenu({ handleDeleteClick, handleEditClick }: ContextMenuProps) {
  return (
    <div className="absolute right-2 top-16 z-10 shadow bg-slate-100 rounded-md text-slate-600 flex flex-col items-start ">
      <EditButton onClick={handleEditClick} />
      <DeleteButton onClick={handleDeleteClick} />
    </div>
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
