import React from "react";
import { View } from "react-native";

import GasolineSvg from "../../assets/gasoline.svg";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CardImage,
} from "./styles";

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thunbnail: string;
}

interface Porps {
  data: CarData;
}

export function Car({ data }: Porps) {
  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg width={20} height={20} />
          </Type>
        </About>
      </Details>

      <CardImage source={{ uri: data.thunbnail }} resizeMode="contain" />
    </Container>
  );
}
