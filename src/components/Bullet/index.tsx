import React from "react";
import { View } from "react-native";

import { Container } from "./styles";

interface BulletProps {
  active?: boolean;
}

export function Bullet({ active = false }: BulletProps) {
  return <Container active={active} />;
}
