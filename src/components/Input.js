import React, {useState} from 'react'
import { Dimensions, StyleSheet, TextInput } from 'react-native'

const { width } = Dimensions.get('window')

const Input = ({
  placeholder, type, secureTextEntry = false, onChangeText, onEndEditing, text, value
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCapitalize='none'
    autoCorrect={false}
    onChangeText={v => onChangeText(type, v)}
    onEndEditing={v => onEndEditing(v.nativeEvent.text)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor='#e2a45b'
    selectionColor={'#e2a45b'}
    text={text}
    value={value}
  />
)

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fcf3db',
    borderRadius: 30,
    height: 45,
    width: width - 20,
    marginTop: 10,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#e2a45b',
    textAlign: 'center'
  }
})

export default Input