import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { OkButton, Content, Title, Description, OkButtonText } from './styles';
import { RouteParams } from './types';

const Profile = () => {
  const { params } = useRoute();

  const { reset } = useNavigation();

  const routeParams = params as RouteParams;

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR },
    );
  }, []);

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

      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Content>
  );
};

export default Profile;
