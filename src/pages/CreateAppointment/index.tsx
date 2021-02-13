import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';
import { RouteParams, Provider, AvailabilityItem } from './types';
import { useAuth } from '../../hooks/AuthHook';
import api from '../../services/api';

const CreateAppointment = () => {
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );
  const [loadingProvider, setLoadingProvider] = useState(false);
  const [errorProvider, setErrorProvider] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [errorAvailability, setErrorAvailability] = useState(false);

  const { user } = useAuth();

  const { goBack } = useNavigation();

  const navigateBack = useCallback(goBack, [goBack]);

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') setShowDatePicker(false);

    if (date) setSelectedDate(date);
  }, []);

  const handleToggleDatePicker = useCallback(
    () => setShowDatePicker(state => !state),
    [],
  );

  const handleSelectProvider = useCallback(
    (providerId: string) => setSelectedProvider(providerId),
    [],
  );

  const handleProviders = useCallback(() => {
    setLoadingProvider(true);
    setErrorProvider(false);

    api
      .get('providers')
      .then(({ data }) => {
        setLoadingProvider(false);
        setProviders(data);
      })
      .catch(() => setErrorProvider(true))
      .finally(() => setLoadingProvider(false));
  }, []);

  const handleAvailability = useCallback(() => {
    setLoadingAvailability(true);
    setErrorAvailability(false);

    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(({ data }) => {
        setLoadingAvailability(false);
        setAvailability(data);
      })
      .catch(() => setErrorAvailability(true))
      .finally(() => setLoadingAvailability(false));
  }, []);

  useEffect(handleProviders, []);

  useEffect(handleAvailability, [selectedDate, selectedProvider]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          horizontal
          showHorizontalScrollIndicator={false}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />

              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <CalendarTitle>Escolha a Data</CalendarTitle>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode-date="date"
            display="calendar"
            is24Hour
            textColor="#f4ede8"
            onChange={handleDateChange}
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
