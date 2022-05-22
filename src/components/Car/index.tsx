import React from "react";
import { View } from "react-native";

import GasolineSvg from "../../assets/gasoline.svg";

import { RectButtonProps } from "react-native-gesture-handler";
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

interface Porps extends RectButtonProps {
  data: CarData;
}

export function Car({ data, ...rest }: Porps) {
  return (
    <Container {...rest}>
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
