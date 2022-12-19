import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, Box, Center, VStack } from "native-base";

function HomeScreen() {
  return (
    <NativeBaseProvider>
      <Box flex={1} alignItems={"center"} justifyContent={"center"}>
        <VStack flex={1} alignItems={'center'} justifyContent={"center"}>
          <Box>Hello world 1</Box>
          <Box>Hello world 2</Box>
          <Box>Hello world 3</Box>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

