import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Spinner() {
  // Thanks to FontAwesome for providing a simple way to show a spinner icon with built-in animation, this component only serves as a wrapper!
  return <FontAwesomeIcon icon={faSpinner} spin size="2x" className="spinner" />;
}