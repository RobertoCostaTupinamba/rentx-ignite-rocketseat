import React from "react";
import { Alert, StatusBar } from "react-native";
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
import { screenProp } from "../../routes/app.stack.routes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { getPlataformDate } from "../../utils/getPlataformDate";
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}
interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = React.useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = React.useState({});
  const [rentalPeriod, setRentalPeriod] = React.useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const navigation = useNavigation<screenProp>();
  const theme = useTheme();

  const route = useRoute();
  const { car } = route.params as Params;

  function hangleGoBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Aviso", "Selecione um período de locação");
    } else {
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
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

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlataformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlataformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
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
            <DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={() => handleConfirmRental()}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
