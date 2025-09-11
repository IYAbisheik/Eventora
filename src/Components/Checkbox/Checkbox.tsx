import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Checkbox = ({
  label = '',
  size = 24,
  checkedColor = '#4A6CF7',
  uncheckedColor = '#ccc',
  labelStyle = {},
  onChange = () => {},
  defaultChecked = false,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggleCheckbox = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange(newValue);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleCheckbox}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderColor: checked ? checkedColor : uncheckedColor,
            backgroundColor: checked ? checkedColor : 'transparent',
          },
        ]}
      >
        {checked && <Icon name="check" size={size * 0.7} color="#fff" />}
      </View>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 3,
    fontSize: 16,
    color: '#333',
  },
});

export default Checkbox;
