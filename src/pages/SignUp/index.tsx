import React, { useCallback, useRef } from "react";
import { ScrollView, Image, View, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../componets/Input';
import Button from '../../componets/Button';
import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles';
import logoImg from '../../assets/logo.png'

const SignUp = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleSignUp = useCallback((data: object) => {
    console.log(data)
  }, []);

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
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

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
