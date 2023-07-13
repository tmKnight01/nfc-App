import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import Home from '@/pages/Home';
import NfcBlink from '@/pages/NfcBlink';
import PinPage from '@/pages/PinPage';
import CardPage from '@/pages/CardPage';
import CardResut from '@/pages/CardResult';
import ErrorPage from '@/pages/ErrorPage';
import Disclaimer from '@/pages/DisclaimerPage';

interface routeProps {
  name: string;
  component: (props: any) => JSX.Element;
  options?:
  | NativeStackNavigationOptions
  | ((props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  }) => NativeStackNavigationOptions)
  | undefined;
  initialParams?: Record<string, unknown>;
}

const header = () => null;

let routes: Array<routeProps> = [
  {
    name: 'HOME',
    component: Home,
    options: {
      header,
    },
  },
  {
    name: 'NFCBLINK',
    component: NfcBlink,
    options: {
      header,
    },
  },
  {
    name: 'PINPAGE',
    component: PinPage,
    options: {
      header,
    },
  },
  {
    name: 'CARDPAGE',
    component: CardPage,
    options: {
      header,
    },
  },
  {
    name: 'CARDRESULT',
    component: CardResut,
    options: {
      header,
    },
  },
  {
    name: 'ERRORPAGE',
    component: ErrorPage,
    options: {
      header,
    },
  },

  {
    name: 'DISCLAIMER',
    component: Disclaimer,
    options: {
      header
    }
  }
];

/*
This code satisfies that when the app retains the pin data, it will automatically jump to the nfc sensing page, 
but there is no function for the user to automatically delete the pin, so it needs to be improved
*/
const getRouter = async () => {
  try {
    const value = await AsyncStorage.getItem('pin');
    if (value !== null) {
      const temp = routes[0];
      routes[0] = routes[1];
      routes[1] = temp;


    }
    return routes;


  } catch (e) {
    console.log('e', e);

  }


}

export default getRouter;
export type { routeProps }
