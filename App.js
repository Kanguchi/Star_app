import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/home";
import DetailsScreen from "./screens/details";

export default function App() {
    return <AppContainer/>
}

const appStackNavigatior = createStackNavigator(
  {
    home :{ HomeScreen, 
    navigationOptions:{
      headerShown: false,
    }
  },
  Details: {
    screen : DetailsScreen
  }
  },
  {
    initialRouteName: "home"
  }
)

const AppContainer = createAppContainer(appStackNavigatior)