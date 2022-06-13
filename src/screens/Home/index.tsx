import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { screenProp } from "../../routes/app.stack.routes";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

import { LoadAnimation } from "../../components/LoadAnimation";

export function Home() {
  const navigation = useNavigation<screenProp>();
  const [loading, setLoading] = React.useState(true);
  const [cars, setCars] = React.useState<CarDTO[]>([]);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await api.get("/cars");

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
      <StatusBar
        barStyle="light-content" // dark-content, light-content and default
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (
            <TotalCars>
              Total de {cars.length} carro{cars.length > 1 ? "s" : ""}
            </TotalCars>
          )}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
