import React, {useContext, useEffect, useState} from 'react';
import {Box, VStack, Center, useToast} from 'native-base';
import ar from '../../assets/lang/ar.json';
import {SubmitButton} from '@Theme/Buttons';
import {TextInput, PasswordInput} from '@Theme/Inputs';
import {Head} from '@Theme/Typography';
import {loginFlow} from '@context/auth/authRequest';
import {
  AuthDispatchContext,
  AuthStateContext,
} from '@context/auth/AuthProvider';

const logintypo = ar.login;

export default function () {
  const [userBody, setUserBody] = useState({username: '', password: ''});
  const authDispatch = useContext(AuthDispatchContext);
  const {fromLogin, status, error} = useContext(AuthStateContext);
  const toast = useToast();

  const onSubmit = () => {
    loginFlow({
      body: userBody,
      dispatch: authDispatch,
    });
  };

  useEffect(() => {
    if (error) {
      toast.show({
        title: logintypo.auth_warning_title,
        status: 'warning',
        description: error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Box safeArea flex={1}>
      <Center px="3" py="1" mt="70">
        <VStack w="90%" maxW="290" space={92}>
          <Box>
            <Head text={logintypo.welcome} size="lg" fw="600" />
            <Head text={`${logintypo.login_txt}!`} size="xs" type="sh" />
          </Box>
          <VStack space={28} mt="5">
            <TextInput
              label={logintypo.input_email_label}
              state={userBody}
              value="username"
              setValue={setUserBody}
            />
            <PasswordInput
              label={logintypo.input_password_label}
              state={userBody}
              value="password"
              setValue={setUserBody}
            />
          </VStack>
          <SubmitButton
            text={logintypo.login_button}
            isLoading={status === 'loading' && fromLogin}
            isLoadingText={`${logintypo.loading_text}...`}
            onSubmit={() => onSubmit()}
          />
        </VStack>
      </Center>
    </Box>
  );
}
