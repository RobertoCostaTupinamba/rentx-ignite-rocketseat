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
import {
  Calendar,
  DayProps,
  generateInterval,
} from "../../components/Calendar";
import { screenProp } from "../../routes/stack.routes";
import { useNavigation } from "@react-navigation/native";

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = React.useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = React.useState({});
  const navigation = useNavigation<screenProp>();
  const theme = useTheme();

  function hangleGoBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails");
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      [start, end] = [end, start];
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
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
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={() => handleConfirmRental()} />
      </Footer>
    </Container>
  );
}
