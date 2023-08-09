import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {routeProps, routes} from 'router/index';

import Loading from '@/pages/Landing';
const Stack = createNativeStackNavigator();
const Screen = Stack.Screen;

function App() {
  // const [routes, setRoutes] = useState<Array<routeProps>>([]);
  const [initName, setInitName] = useState<string>('');
  React.useEffect(() => {
    (async () => {
      // const routes = await getRouter();
      const value = await AsyncStorage.getItem('apikey');
      setInitName(value ? 'NFCBLINK' : 'RESGISTER');
      //
    })();
  }, []);

  React.useEffect(() => {
    console.log('initName', initName);
    if (initName) SplashScreen.hide();
  }, [initName]);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName={initName}>
          {routes.map((item, i) => (
            <Screen
              key={i}
              name={item.name}
              component={item.component}
              options={item.options}
            />
          ))}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
