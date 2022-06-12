import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "styled-components";

import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  refInput?: React.RefObject<TextInput>;
}

export function Input({ iconName, refInput, ...rest }: Props) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!rest.value);
  }

  const theme = useTheme();
  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        ref={refInput}
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
}
