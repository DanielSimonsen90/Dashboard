import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, } from '@fortawesome/free-regular-svg-icons';
import { faDownload, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';

export type ButtonPanelAction = 'create' | 'edit' | 'download' | 'filter';

type Props = {
  onButtonClick: (action: ButtonPanelAction) => void;
};

export default function ButtonPanel({ onButtonClick }: Props) {
  // Looped button definitions for scalability
  const buttons = [
    { onClick: () => onButtonClick('filter'), icon: faFilter },
    { onClick: () => onButtonClick('download'), icon: faDownload },
    { onClick: () => onButtonClick('edit'), icon: faPenToSquare },
    { onClick: () => onButtonClick('create'), icon: faPlus }
  ]

  return (
    <div className="button-panel">
      {buttons.map(({ onClick, icon }) => (
        <button type="button" key={icon.iconName} onClick={onClick}>
          {/* FontAwesome icon used here instead of design icons, as the design manual was not provided */}
          <FontAwesomeIcon icon={icon} />
        </button>
      ))}
    </div>
  );
}