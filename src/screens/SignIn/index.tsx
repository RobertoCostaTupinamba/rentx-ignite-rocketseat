import React from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert,
} from "react-native";
import * as Yup from "yup";

import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import { Container, Header, SubTitle, Title, Form, Footer } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { screenProp } from "../../routes/stack.routes";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = useAuth();

  const navigation = useNavigation<screenProp>();

  const theme = useTheme();

  const passwordInputRef = React.useRef<TextInput>(null);

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate({ email, password }, { abortEarly: false });

      await signIn({ email, password }).then(() => {
        Alert.alert("Sucesso", "Login realizado com sucesso");
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.map((err) => err.message);

        Alert.alert("Erro", errors.join("\n"));
      } else {
        Alert.alert("Erro", "Erro no login");
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos{"\n"}
              quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{"\n"}uma experiência incrivel
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <PasswordInput
              refInput={passwordInputRef}
              iconName="lock"
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              enabled={true}
              loading={false}
              onPress={handleSignIn}
            />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              enabled={true}
              loading={false}
              onPress={handleNewAccount}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
