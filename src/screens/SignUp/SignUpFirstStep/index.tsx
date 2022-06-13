import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import { screenProp } from "../../../routes/app.stack.routes";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";

import * as Yup from "yup";

import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Alert, Keyboard, KeyboardAvoidingView, TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export function SignUpFirstStep() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [driverLicense, setDriverLicense] = React.useState("");

  const navigation = useNavigation<screenProp>();

  const emailInputRef = React.useRef<TextInput>(null);

  const cnhInputRef = React.useRef<TextInput>(null);

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .email("Email inválido")
          .required("Email obrigatório"),
        driverLicense: Yup.string().required("CNH obrigatório"),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data, { abortEarly: false });

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.map((err) => err.message);

        return Alert.alert("Erro", errors.join("\n"));
      }
    }
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
              value={name}
              onChangeText={(text) => setName(text)}
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
              value={email}
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => {
                cnhInputRef.current?.focus();
              }}
            />
            <Input
              refInput={cnhInputRef}
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={(text) => setDriverLicense(text)}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
