import React, { useCallback, useRef } from "react";
import {
  ScrollView,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import Input from '../../componets/Input';
import Button from '../../componets/Button';
import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles';
import logoImg from '../../assets/logo.png';
import schema from './formValidation';
import getValidationErros from '../../utils/getValidationErros';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Faça o login',
        )

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        };

        // Alert.alert(
        //   'Erro ao cadastrar',
        //   'Tente novamente',
        // )
      }
    },
    [],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                autoCorrect={false}
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                ref={emailInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                onSubmitEditing={() => formRef.current?.submitForm()}
                textContenType="newPassword"
                returnKeyType="send"
              />

              <Button onPress={() => formRef.current?.submitForm()}>Criar</Button>
            </Form>

          </Container>
        </ScrollView>

        <BackToSignInButton onPress={() => navigation.navigate('SignIn')}>
          <Icon name="arrow-left" size={20} color="#fff" />

          <View>
            <BackToSignInButtonText>
              Voltar para logon
            </BackToSignInButtonText>
          </View>
        </BackToSignInButton>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignUp;
