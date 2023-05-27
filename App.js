import React, { useEffect,useState } from 'react';
import { View, Text,TouchableOpacity,Button } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import Register from './screens/Register';
import LogIn from './screens/LogIn';
import Events from './screens/Events/Events'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import CreateEventScreen from './screens/CreateEvent/CreateEvent';
import ProfileScreen from './screens/Profile/Profile';
import en from './translations/en';
import mk from './translations/mk'


const TabNavigator = () => {
  const [language,setLanguage]= useState(en);
  const [activeLanguage, setActiveLanguage] = useState(en);

  const handleLanguageChange =(lang)=>{
    setActiveLanguage(lang);
  setLanguage(lang)
}

  return (
 
      <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => handleLanguageChange(en)} style={{ marginRight: 10 }}>
              <Button title="EN" onPress={() => handleLanguageChange(en)} color={activeLanguage === en ? '' : 'black'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange(mk)}>
              <Button title="MK" onPress={() => handleLanguageChange(mk)} color={activeLanguage === mk ? '' : 'black'} />
            </TouchableOpacity>
          </View>
        ),
      }}

      >
        <Tab.Screen options={{
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="home" size={24} color="black" />
      ),
    }}   name={language.events} component={Events} initialParams={{language}} />
        <Tab.Screen options={{
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="post-add" size={24} color="black" />
      ), }} name={language.cevent} component={CreateEventScreen} initialParams={{language}} />
        <Tab.Screen  options={{
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="user" size={24} color="black" />
      ),
    }}  name={language.profile} component={ProfileScreen} initialParams={{language}}/>

      </Tab.Navigator>
 

  );
};



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {

    // Your Firebase code that depends on initialization, such as setting up listeners or initializing other Firebase services
  }, []);

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}> 
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="Register" component={Register} /> 
    <Stack.Screen name="LogIn" component={LogIn} /> 
    <Stack.Screen name="MainPage" component={TabNavigator} />
  </Stack.Navigator>
   </NavigationContainer>
  );
};

export default App;
