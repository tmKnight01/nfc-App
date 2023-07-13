import { ToastAndroid } from 'react-native'


const showToast = (text: string) => {
    ToastAndroid.show(text, ToastAndroid.TOP);
};

export { showToast }