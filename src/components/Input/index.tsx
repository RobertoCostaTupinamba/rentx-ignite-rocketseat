import React from "react";
import { TextInputProps, View } from "react-native";
import { useTheme } from "styled-components";

import { Container } from "./styles";
import { Feather } from "@expo/vector-icons";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function Input({ iconName }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <Feather name={iconName} size={24} color={theme.colors.text_detail} />
    </Container>
  );
}
