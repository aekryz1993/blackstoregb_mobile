import React from 'react';
import {Button} from 'native-base';

export const SubmitButton = ({text, onSubmit, isLoading, isLoadingText}) => (
  <Button
    bg="tertiary.900"
    isLoading={isLoading}
    onPress={onSubmit}
    isLoadingText={isLoadingText}>
    {text}
  </Button>
);
