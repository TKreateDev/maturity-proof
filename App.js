import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, Box, Center, VStack, HStack, Heading, Pressable, Checkbox } from "native-base";
import questions from './ethics';




function HomeScreen({navigation}) {
  return (
    
    <NativeBaseProvider>
      <SafeAreaView style={[styles.container]}>
      <Box>
          {questions.map(({topic, subtopics},key) => 
          <Center key={key}>
            <Heading>{topic}</Heading>
            <VStack alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} space={3}>{subtopics.map(({title}, key) => 
              <Pressable key={key} onPress={() => navigation.navigate('Topic',{quest: subtopics[key].questions, title: title})}><Center flexWrap={'wrap'} padding={5} marginY={3} bg="primary.300" rounded="md" shadow={3} key={key}>{title}</Center></Pressable>
            )}</VStack>
          </Center>)}
      </Box>
      </SafeAreaView>
    </NativeBaseProvider>
    
  );
}

function nextQuestion(index, length, navigation, setIndex, setIsChecked) {
  setIsChecked(false);
  if (index + 1 == length) {
    return navigation.navigate('Home')
  }
  else return setIndex(index+1)
}

function previousQuestion(index, navigation, setIndex, setIsChecked) {
  setIsChecked(false);
  if (index == 0) {
    return navigation.navigate('Home')
  }
  else return setIndex(index-1)
}

function TopicScreen({route, navigation}) {
  const {quest, title} = route.params;
  const [index, setIndex] = React.useState(0)
  const [length, setLength] = React.useState(quest.length)
  const [isChecked, setIsChecked] = React.useState(false)
  return (
    <NativeBaseProvider>
      <SafeAreaView style={[styles.container]}>
        <Center flexWrap={'wrap'} padding={5} marginY={3} bg="primary.300" rounded="md" shadow={3}>{quest[index].statement}</Center>
        <Center style={[styles.checkbox]}><Checkbox isChecked={isChecked} onChange={(val) => setIsChecked(val)} value="completed"  accessibilityLabel="I have completed this.">I have completed this.</Checkbox></Center>
        <HStack alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} space={3}>
          <Pressable onPress={() => nextQuestion(index, length, navigation, setIndex, setIsChecked)}>
            <Center flexWrap={'wrap'} padding={5} marginY={3} bg="secondary.300" rounded="md" shadow={3}>Next</Center>
          </Pressable>
          <Pressable onPress={() => previousQuestion(index, navigation, setIndex, setIsChecked)}>
            <Center flexWrap={'wrap'} padding={5} marginY={3} bg="primary.300" rounded="md" shadow={3}>Previous</Center>
          </Pressable>
        </HStack>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  checkbox: {
    zIndex: -5
  }
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Topic" component={TopicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

