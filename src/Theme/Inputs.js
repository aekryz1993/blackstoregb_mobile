import React from 'react';
import {Input, Icon, FormControl, Pressable} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const PasswordInput = ({label, placeholder, state, value, setValue}) => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  const handleChange = text => {
    setValue({...state, [value]: text});
  };

  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        type={show ? 'text' : 'password'}
        _focus={{borderColor: 'tertiary.900'}}
        InputRightElement={
          <Pressable onPress={handleClick}>
            <Icon
              as={
                <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        placeholder={placeholder}
        value={state[value]}
        onChangeText={t => handleChange(t)}
      />
    </FormControl>
  );
};

export const TextInput = ({label, placeholder, state, value, setValue}) => {
  const handleChange = text => {
    setValue({...state, [value]: text});
  };

  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        _focus={{borderColor: 'tertiary.900'}}
        placeholder={placeholder}
        value={state[value]}
        onChangeText={t => handleChange(t)}
      />
    </FormControl>
  );
};
