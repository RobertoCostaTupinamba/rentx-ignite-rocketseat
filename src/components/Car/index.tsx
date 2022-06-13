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
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface Porps extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: Porps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon width={20} height={20} />
          </Type>
        </About>
      </Details>

      <CardImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}
