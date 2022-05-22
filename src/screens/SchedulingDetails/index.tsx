import React from "react";
import { Feather } from "@expo/vector-icons";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  DateInfo,
  DateTitle,
  CalendarIcon,
  DateValue,
  RetalPrice,
  RentalPriceLabel,
  ReantalPriceDetails,
  RentalPriceQouta,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { screenProp } from "../../routes/stack.routes";

export function SchedulingDetails() {
  const navigation = useNavigation<screenProp>();
  const theme = useTheme();

  function hangleGoBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate("SchedulingComplete");
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => hangleGoBack()} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://www.pngmart.com/files/16/Convertible-Red-Lamborghini-PNG-Clipart.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory name="360Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasoline" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2022</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>20/06/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RetalPrice>
          <RentalPriceLabel>Valor total</RentalPriceLabel>
          <ReantalPriceDetails>
            <RentalPriceQouta>R$ 580 x3 diárias</RentalPriceQouta>
            <RentalPriceTotal>R$ 2.900,00</RentalPriceTotal>
          </ReantalPriceDetails>
        </RetalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={() => handleConfirmRental()}
        />
      </Footer>
    </Container>
  );
}
