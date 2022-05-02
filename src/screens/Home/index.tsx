import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import { Container, Header, TotalCars, HeaderContent } from "./styles";

export function Home() {
  const carDataOne = {
    brand: "Audi",
    name: "RS 5 Coupé",
    rent: {
      period: "AO DIA",
      price: 120,
    },
    thunbnail: "https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png",
  };

  const carDataTwo = {
    brand: "Porsche",
    name: "Panamera",
    rent: {
      period: "AO DIA",
      price: 340,
    },
    thunbnail:
      "https://www.webmotors.com.br/imagens/prod/347468/PORSCHE_PANAMERA_2.9_V6_EHYBRID_4_PDK_34746806265508980.webp?s=fill&w=236&h=135&q=70&t=true",
  };

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

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carDataOne} />

      <Car data={carDataTwo} />
    </Container>
  );
}
