import { ToastAndroid } from 'react-native'


const showToast = (text: string) => {
    ToastAndroid.show(text, ToastAndroid.TOP);
};


const renderHTML = (content: string) =>
    content?.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

export { showToast, renderHTML }