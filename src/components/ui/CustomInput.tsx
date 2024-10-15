import { FC } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/Ionicons';
import React from 'react';


interface InputProps {
  left?: React.ReactNode;
  onClear?: () => void;
  right?: boolean;
}
const CustomInput: FC<InputProps & React.ComponentProps<typeof TextInput>> = ({
  left,
  right = true,
  onClear,
  ...props
}) => {
  return (
    <View style={styles.flexRow}>
        {left}
      <TextInput
        {...props}
        style={styles.inputContainer}
        placeholderTextColor='#ccc'
      />
      <View style={styles.icon}>
        {props.value?.length !=0 && right && 
        <TouchableOpacity onPress={onClear}>
          <Icon name="close-circle-outline" size={RFValue(16)} color={Colors.text} />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  text: {
    width: '10%',
    marginRight: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowColor: Colors.border,
    borderColor:Colors.border,
    elevation: 2,
  },
  inputContainer:{
    width: '70%',
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(14),
    paddingVertical: 10,
    paddingBottom: 10,
    color: Colors.text,
    bottom: -1,
    height: '100%',
  },
  icon: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default CustomInput;
