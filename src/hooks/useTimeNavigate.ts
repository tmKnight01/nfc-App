import { useRef, useState, useCallback } from "react";
import { PanResponder, PanResponderInstance } from 'react-native';
import { useNavigation, useFocusEffect, StackActions } from '@react-navigation/native';
import { ROUTE } from '@/utils/constant';


function useTimeNavigate(): PanResponderInstance {
    const [count, setCount] = useState(0);
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
    useFocusEffect(
        useCallback(() => {
            IntervalrRef.current = setInterval(() => {
                if (count == 30) {
                    navigation.dispatch(StackActions.replace(ROUTE.NFCBLINK))
                }
                setCount(count => count + 1);
            }, 1000);
            return () => clearInterval(IntervalrRef.current);
        }, [count]),
    );

    return panResPonser;

}




export default useTimeNavigate;