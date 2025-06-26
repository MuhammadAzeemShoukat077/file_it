import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

const Icon = ({ name, size = 24, color = '#000' }: IconProps) => (
  <MaterialIcons name={name} size={size} color={color} />
);

export default Icon; 