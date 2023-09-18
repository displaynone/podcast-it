import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../colors';
import { IconProps } from '../types';

export const WarningIcon: FC<IconProps> = ({
  size = 24,
  color = colors.orange,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM11,7a1,1,0,0,1,2,0v6a1,1,0,0,1-2,0Zm1,12a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Z"
        fill={color}
      />
    </Svg>
  );
};
