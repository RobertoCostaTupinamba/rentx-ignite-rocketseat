import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import { DTOUser, screenProp } from "../../../routes/app.stack.routes";

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

import { Button } from "../../../components/Button";
import { Alert, Keyboard, KeyboardAvoidingView, TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PasswordInput } from "../../../components/PasswordInput";
import { useTheme } from "styled-components";
import * as Yup from "yup";
import { api } from "../../../services/api";

interface Params {
  user: DTOUser;
}

export function SignUpSecondStep() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigation = useNavigation<screenProp>();
  const route = useRoute();
  const theme = useTheme();

  const inputConfirmPasswordRef = React.useRef<TextInput>(null);

  const { user } = route.params as Params;

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required("Senha obrigatória"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Senhas não conferem")
          .required("Confirmação de senha obrigatória"),
      });

      await schema.validate(
        { password, confirmPassword },
        { abortEarly: false }
      );

      await api
        .post("/users", {
          name: user.name,
          email: user.email,
          driver_license: user.driverLicense,
          password,
        })
        .then(() => {
          navigation.navigate("Confirmation", {
            title: "Cadastro realizado!",
            message: `Agora você já pode fazer login\nna plataforma.`,
            nextScreenRoute: "SignIn",
          });
        })
        .catch(() => {
          Alert.alert("Erro ao cadastrar usuário");
        });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.map((err) => err.message);

        return Alert.alert("Erro", errors.join("\n"));
      }
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
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
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              returnKeyType="next"
              value={password}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={() => {
                inputConfirmPasswordRef.current?.focus();
              }}
            />
            <PasswordInput
              refInput={inputConfirmPasswordRef}
              iconName="lock"
              placeholder="Repetir Senha"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </Form>

          <Button
            title="Cadastrar"
            onPress={handleRegister}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
