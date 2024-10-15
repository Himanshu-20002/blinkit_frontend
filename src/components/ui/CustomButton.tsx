import {FC} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';
import {Colors} from '../../utils/Constants';
import React from 'react';
import {Fonts} from '../../utils/Constants';

interface CustomButtonProps {
    title: string;
    onPress: ()=>void;
    disabled?: boolean;
    loading?: boolean;
}
const CustomButton: FC<CustomButtonProps> = ({title, onPress, disabled, loading}) => {
    return (
     <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.btn,{backgroundColor: disabled ? Colors.disabled : Colors.secondary}]} activeOpacity={0.8} >
        {loading ? <ActivityIndicator color="white" size="small"/> : <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={styles.text} numberOfLines={1}>{title}</CustomText>}
     </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    btn:{
        justifyContent: 'center',
        alignItems: 'center',
        padding:14,
        borderRadius: 10,
        marginVertical: 15,
        width: '100%',

    },
    text:{
        color:'#fff'
        
    }
})
export default CustomButton;
