import React from "react";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Confirmation } from "../screens/Confirmation";
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

export type RootAuthParamList = {
  Splash: undefined;
  SignIn: undefined;
  Confirmation: ScreenDTO;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: DTOUser };
};

const { Navigator, Screen } = createNativeStackNavigator<RootAuthParamList>();

export type screenProp = NativeStackNavigationProp<RootAuthParamList>;

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
