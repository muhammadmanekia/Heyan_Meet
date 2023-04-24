import {View, Text} from 'react-native';
import React from 'react';
import {useApplePay} from '@stripe/stripe-react-native';

const Payment = () => {
  const {presentApplePay, confirmApplePayPayment} = useApplePay();
  const {error, paymentMethod} = presentApplePay({
    cartItems: [
      {
        label: 'payment label',
        amount: '50', // amount as string
        type: 'final',
      },
    ],
    country: 'US',
    currency: 'USD',
  });
  if (error) {
    Alert.alert(error.code, error.message);
  } else {
    const {error: confirmApplePayError} = await;
    confirmApplePayPayment(clientSecret);
    if (confirmApplePayError) {
      Alert.alert(confirmApplePayError.code, confirmApplePayError.message);
    } else {
      Alert.alert('Success', 'The payment was confirmed      successfully!');
    }
  }
  return (
    <View>
      <Text>Payment</Text>
    </View>
  );
};

export default Payment;
