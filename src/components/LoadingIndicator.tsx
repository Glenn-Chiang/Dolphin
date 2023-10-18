import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingIndicator() {
  return (
    <div className="bg-sky-200 text-sky-500 rounded-md p-4 text-center flex gap-4 items-center justify-center flex-col">
      <div className="flex gap-2 items-center justify-center flex-col">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sky-500 text-4xl"/>
        Loading...
      </div>
    </div>
  );
}
