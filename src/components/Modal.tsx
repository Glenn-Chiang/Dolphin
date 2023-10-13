import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Modal({
  children,
  close,
}: {
  children: React.ReactNode;
  close: () => void;
}) {
  return (
    <div className="w-screen h-screen fixed bg-slate-400/40 z-20 left-0 top-0 flex justify-center items-center">
      <section className="bg-white rounded-xl p-4 w-11/12 sm:w-2/3 relative">
        {children}
        <button
          onClick={close}
          className="absolute right-2 top-2 hover:bg-slate-200 rounded-full p-2 w-10 h-10 transition"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </section>
    </div>
  );
}
