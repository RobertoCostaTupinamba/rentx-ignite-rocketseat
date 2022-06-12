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

export function SignUpFirstStep() {
  const navigation = useNavigation<screenProp>();

  function handleBack() {
    navigation.goBack();
  }

  return (
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
      </Form>
    </Container>
  );
}
