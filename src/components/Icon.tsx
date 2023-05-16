import { IconProps } from '../atoms';

export function Icon({ name }: IconProps) {
  return (
    <div className="material-icons-round" style={{ fontSize: 'inherit' }}>
      {name}
    </div>
  );
}
