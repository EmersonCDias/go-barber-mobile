import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { OkButton, Content, Title, Description, OkButtonText } from './styles';

const Profile = () => {
  const { reset } = useNavigation();

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Content>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>

      <Description>Teste</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Content>
  );
};

export default Profile;
