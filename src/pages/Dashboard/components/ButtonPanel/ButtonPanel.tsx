import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, } from '@fortawesome/free-regular-svg-icons';
import { faDownload, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onCreate(): void;
  onEdit(): void;
  onDownload(): void;
  onFilter(): void;
};

export default function ButtonPanel({
  onCreate,
  onEdit,
  onDownload,
  onFilter
}: Props) {
  const buttons = [
    { onClick: onFilter, icon: faFilter },
    { onClick: onDownload, icon: faDownload },
    { onClick: onEdit, icon: faPenToSquare },
    { onClick: onCreate, icon: faPlus }
  ]

  return (
    <div className="button-panel">
      {buttons.map(({ onClick, icon }) => (
        <button type="button" key={icon.iconName} onClick={onClick}>
          <FontAwesomeIcon icon={icon} />
        </button>
      ))}
    </div>
  );
}