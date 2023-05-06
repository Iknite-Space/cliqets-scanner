import {Box, Image, Modal, Text} from 'native-base';
import React from 'react';
import CustomButton, {ButtonType} from './Button.component';

type Props = {
  showModal: boolean;
  heading: string;
  description: string;
  setShowModal: any;
  btnText: string;
  btnType: ButtonType;
  onPress: any;
  modalType: ModalType;
};

export enum ModalType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

const CustomModal: React.FC<Props> = ({
  showModal = false,
  heading = 'Heading',
  description = 'Description',
  setShowModal,
  btnText = 'Button',
  btnType = ButtonType.PRIMARY,
  onPress = () => {},
  modalType = ModalType.INFO,
}) => {
  const icon =
    modalType === ModalType.SUCCESS
      ? require('../../assets/Success.png')
      : require('../../assets/error.png');
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header alignItems="center">
          <Text
            fontSize={24}
            fontWeight={'700'}
            color={modalType === ModalType.ERROR ? 'error.500' : 'gray.800'}>
            {heading}
          </Text>
        </Modal.Header>
        <Modal.Body alignItems="center">
          <Box my={3}>
            {(modalType === ModalType.SUCCESS ||
              modalType === ModalType.ERROR) && (
              <Image source={icon} w={70} h={70} alt={'error'} />
            )}
          </Box>
          <Text fontSize={16} color="gray.500" fontWeight="400" mb={3}>
            {description}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton onPress={onPress} btnText={btnText} btnType={btnType} />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CustomModal;
