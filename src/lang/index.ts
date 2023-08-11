import i18next, { ModuleType } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { langKey } from '@/utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';


const languageDetector = {
    type: 'languageDetector' as ModuleType,
    async: true,
    detect: function (callback: any) {
        AsyncStorage.getItem(langKey).then(value => {
            if (value) callback(value);
            else {
                callback('zh');
                AsyncStorage.setItem(langKey, 'zh'); // 初设为zh
            }
        });
    },
};

// 初始化i18next设置
i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'zh', // 切换语言失败时的使用的语言
        debug: __DEV__, // 开发环境开启调试
        // 资源文件
        resources: {
            en: {
                // english-US
                translation: require('./en-US.json'),
            },
            cn: {
                // zh-CN

                translation: require('./zh-CN.json'),
            },
            hk: {
                // zh-HK
                translation: require('./zh-HK.json'),
            },
        },
    });
/**
 * 
 *切换语言  
 *
*/
export const changeLanguage = async (lng: 'en' | 'zh' | 'hk') => {
    //  切换语言 
    await i18next.changeLanguage(lng || 'en');
    // 持久化当前选择
    await AsyncStorage.setItem(langKey, lng);
}

export default i18next;