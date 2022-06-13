import React from "react";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars/index";
import { CarDTO } from "../dtos/CarDTO";
import { Splash } from "../screens/Splash/index";
import { SignIn } from "../screens/SignIn/index";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";

export interface DTOUser {
  name: string;
  email: string;
  driverLicense: string;
}

type ScreenDTO = {
  nextScreenRoute: "SignIn" | "Home";
  title: string;
  message: string;
};

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  SchedulingComplete: undefined;
  MyCars: undefined;
  Splash: undefined;
  SignIn: undefined;
  Confirmation: ScreenDTO;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: DTOUser };
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export type screenProp = NativeStackNavigationProp<RootStackParamList>;

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />

      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
