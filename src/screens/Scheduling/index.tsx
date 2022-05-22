import React from "react";
import { StatusBar } from "react-native";
import { BackButton } from "../../components/BackButton";

import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueContainer,
  Content,
  Footer,
} from "./styles";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import { screenProp } from "../../routes/stack.routes";
import { useNavigation } from "@react-navigation/native";

export function Scheduling() {
  const navigation = useNavigation<screenProp>();
  const theme = useTheme();

  function hangleGoBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails");
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={() => hangleGoBack()} color={theme.colors.shape} />

        <Title>
          Escolha uma{"\n"}
          data de inicio e{"\n"}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueContainer selected={false}>
              <DateValue></DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={false}>
              <DateValue></DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={() => handleConfirmRental()} />
      </Footer>
    </Container>
  );
}
