import React, { useEffect } from "react";
import { FlatList, StatusBar, View } from "react-native";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTilte,
  AppointmentsQuantity,
} from "./styles";

import { api } from "../../services/api";
import { BackButton } from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Car } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

export function MyCars() {
  const [cars, setCars] = React.useState<CarProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function hangleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

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

        <SubTitle>Conforto, Segurança e praticidade</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTilte>Agengamentos feitos</AppointmentsTilte>
          <AppointmentsQuantity>05</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Car data={item.car} />}
        />
      </Content>
    </Container>
  );
}
