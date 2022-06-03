import React, { useEffect } from "react";
import { View } from "react-native";

import { Container } from "./styles";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

export function MyCars() {
  const [cars, setCars] = React.useState<CarDTO[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

  return <Container></Container>;
}
