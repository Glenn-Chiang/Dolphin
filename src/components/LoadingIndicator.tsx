import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingIndicator() {
  return (
    <div className="bg-sky-200 text-sky-500 rounded-md p-4 text-center flex gap-2 items-center justify-center">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sky-500"/>
      Loading...
    </div>
  );
}
