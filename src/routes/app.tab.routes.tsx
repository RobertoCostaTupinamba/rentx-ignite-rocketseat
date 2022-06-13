import React from "react";

import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars/index";
import { AppStackRoutes } from "./app.stack.routes";

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  MyCars: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<RootTabParamList>();

export type screenProp = BottomTabNavigationProp<RootTabParamList>;

export function AppTabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={AppStackRoutes} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="Profile" component={Home} />
    </Navigator>
  );
}
