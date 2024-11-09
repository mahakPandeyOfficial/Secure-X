import { StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import COLORS from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router';

const HelpLine = (props) =>{
    const router = useRouter();
    const navigation = useNavigation(); // Access the navigation object using the hook
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;
  return (
    
    <View >
    
    <TouchableOpacity style ={{
        ...styles.button,
        ...{backgroundColor: bgColor},
        ...props.style
    }}
    onPress={() => navigation.navigate('HelpLineScreen')}>
        <Text style={{  fontFamily: 'outfit-medium' , fontSize: 25, ...{ color : textColor }}}>Helpline Contacts</Text>
    </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 100,
        marginLeft: 50,
        paddingVertical: 10,
        paddingBottom: 16,
        width:250,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
    
})
export default HelpLine