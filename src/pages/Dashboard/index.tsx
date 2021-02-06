import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/AuthHook';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderAvatar,
  ProviderMetaText,
  ProvidersListTitle,
} from './styles';
import api from '../../services/api';
import { Provider } from './types';

const Dashboard = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, []);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  const handleProviders = useCallback(() => {
    setLoading(true);
    setError(false);

    api
      .get('providers')
      .then(({ data }) => {
        setProviders(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(handleProviders, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Olá, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      {loading && <UserName>Carregando</UserName>}

      {!loading && error && <UserName>Falha</UserName>}

      {!loading && !error && !providers.length && (
        <UserName>Não há barbeiros disponíveis!</UserName>
      )}

      {!loading && !error && providers.length && (
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          ListHeaderComponent={
            <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
          }
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => navigateToCreateAppointment(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />

              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>

                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderMetaText>8h às 18h</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
      )}
    </Container>
  );
};

export default Dashboard;
