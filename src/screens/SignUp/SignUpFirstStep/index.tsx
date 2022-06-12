import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import { screenProp } from "../../../routes/stack.routes";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Keyboard, KeyboardAvoidingView, TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export function SignUpFirstStep() {
  const navigation = useNavigation<screenProp>();

  const emailInputRef = React.useRef<TextInput>(null);

  const cnhInputRef = React.useRef<TextInput>(null);

  function handleBack() {
    navigation.goBack();
  }

  function handleNextStep() {
    navigation.navigate("SignUpSecondStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{"\n"}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {"\n"}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              autoCorrect
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              refInput={emailInputRef}
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {
                cnhInputRef.current?.focus();
              }}
            />
            <Input
              refInput={cnhInputRef}
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
