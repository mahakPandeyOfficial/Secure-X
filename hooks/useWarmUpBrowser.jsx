import React from 'react';
import * as WebBrowser from 'expo-web-browser'
import { Platform } from 'react-native';


export const useWarmUpBrowser =()=>{
    React.useEffect(()=>{
        void WebBrowser.warmUpAsync();
        return ()=>{
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
                // Use WebBrowser.coolDownAsync or any mobile-specific method
                WebBrowser.coolDownAsync();
              } else {
                // Do nothing or handle for web
                console.log('This feature is not available on web');
              }
           
        };
    }, []);
};