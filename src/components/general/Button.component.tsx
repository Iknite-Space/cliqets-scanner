import {Button, Text} from 'native-base';
import React from 'react';

type Props = {
  btnText: string;
  disabled?: boolean;
  btnType: ButtonType;
  onPress?: (e?: any) => any;
  loading?: boolean;
};

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

const CustomButton: React.FC<Props> = ({
  btnText = 'button',
  btnType = ButtonType.PRIMARY,
  disabled = false,
  onPress = () => {},
  loading = false,
}) => {
  return (
    <Button
      bgColor={btnType === ButtonType.PRIMARY ? 'primary.500' : 'transparent'}
      isDisabled={disabled || loading}
      borderRadius={30}
      variant={btnType === ButtonType.PRIMARY ? 'solid' : 'outline'}
      borderColor="primary.500"
      mx="auto"
      px="10"
      py="3"
      onPress={onPress}>
      <Text
        fontWeight="700"
        fontSize={'16px'}
        color={btnType === ButtonType.PRIMARY ? 'white' : 'primary.500'}>
        {loading ? 'Please wait...' : btnText}
      </Text>
    </Button>
  );
};

export default CustomButton;
