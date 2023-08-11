import { useRef, useState, useCallback, useEffect } from 'react';
import { PanResponder, PanResponderInstance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    useNavigation,
    useFocusEffect,
    StackActions,
} from '@react-navigation/native';
import { ROUTE } from '@/utils/constant';

function useTimeNavigate(): PanResponderInstance {
    const [count, setCount] = useState(0);
    const timeoutRef = useRef(3000);
    const navigation = useNavigation();
    const IntervalrRef = useRef<NodeJS.Timeout>();

    const panResPonser = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderEnd: e => {
                setCount(0);
            },
        }),
    ).current;

      useEffect(() => {
        try {
          AsyncStorage.getItem('timeout').then(value => {
            if (value && Number(value) > 0) {
              timeoutRef.current = Number(value);
            }
          });
        } catch (err) {}
      }, []);

    useFocusEffect(
        useCallback(() => {
            IntervalrRef.current = setInterval(() => {
                if (count == timeoutRef.current) {
                    navigation.dispatch(StackActions.replace(ROUTE.NFCBLINK));
                }
                setCount(count => count + 1);
            }, 1000);
            return () => clearInterval(IntervalrRef.current);
        }, [count]),
    );

    return panResPonser;
}

export default useTimeNavigate;
