import React, { useRef, useState } from "react";
import { ViewToken } from "react-native";
import { FlatList } from "react-native";
import { Bullet } from "../Bullet";

import { Container, ImageIndexes, CarImageWrapper, CarImage } from "./styles";

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const { viewableItems } = info;
    const [first] = viewableItems;
    setImageIndex(first.index!);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => {
          return <Bullet key={index} active={index === imageIndex} />;
        })}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}
