import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import getRouter, {routeProps} from 'router/index';

import Loading from '@/pages/Landing';
const Stack = createNativeStackNavigator();
const Screen = Stack.Screen;

function App() {
  const [routes, setRoutes] = useState<Array<routeProps>>([]);

  React.useEffect(() => {
    (async () => {
      const routes = await getRouter();
      if (routes) setRoutes(routes);
      SplashScreen.hide();
    })();
  }, []);

  return routes.length !== 0 ? (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
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
  ) : (
    <Loading />
  );
}

export default App;
