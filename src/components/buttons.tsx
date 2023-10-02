function SubmitButton() {
  return (
    <button className="bg-sky-500 text-white p-2 rounded-md shadow shadow-sky-500 hover:shadow-md hover:shadow-sky-500">
      Submit
    </button>
  );
}

function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md text-slate-500 hover:text-black hover:bg-slate-200"
    >
      Cancel
    </button>
  );
}

export { SubmitButton, CancelButton };
