import React from "react";
import { ScrollView, Image, View, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../componets/Input';
import Button from '../../componets/Button';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';
import logoImg from '../../assets/logo.png'


const SignIn = () => {
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
              <Title>Faça seu logon</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => { }}>Entrar</Button>

            <ForgotPassword onPress={() => { }} >
              <ForgotPasswordText>
                Esqueci minha senha
            </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>

        <CreateAccountButton onPress={() => { }}>
          <Icon name="log-in" size={20} color="#ff9000" />

          <View>
            <CreateAccountButtonText>
              Criar conta
            </CreateAccountButtonText>
          </View>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignIn;
