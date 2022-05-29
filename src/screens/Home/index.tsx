import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { RootStackParamList, screenProp } from "../../routes/stack.routes";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";

export function Home() {
  const navigation = useNavigation<screenProp>();
  const [loading, setLoading] = React.useState(true);
  const [cars, setCars] = React.useState<CarDTO[]>([]);

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

  const carData = {
    brand: "Audi",
    name: "RS 5 Coupé",
    rent: {
      period: "AO DIA",
      price: 120,
    },
    thunbnail: "https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png",
  };

  function handleCarDetails() {
    navigation.navigate("CarDetails");
  }

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

          <TotalCars>
            Total de {cars.length} carro{cars.length > 1 ? "s" : ""}
          </TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails()} />
          )}
        />
      )}
    </Container>
  );
}
