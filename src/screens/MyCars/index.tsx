import React, { useEffect } from "react";
import { FlatList, StatusBar, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTilte,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

import { api } from "../../services/api";
import { BackButton } from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Car } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
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
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTilte>Agengamentos feitos</AppointmentsTilte>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
