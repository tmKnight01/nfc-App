import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {routes} from 'router/index';
import  i18next from '@/lang/index';

const Stack = createNativeStackNavigator();
const Screen = Stack.Screen;

function App() {
  const [initName, setInitName] = useState<string>('RESGISTER');
  React.useEffect(() => {
    (async () => {
      try {
        // await AsyncStorage.clear();
        // SplashScreen.hide();
        const value = await AsyncStorage.getItem('apikey');
        setInitName(value ? 'NFCBLINK' : 'RESGISTER');
      } catch (err) {
        console.log('err', err);
      }

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
