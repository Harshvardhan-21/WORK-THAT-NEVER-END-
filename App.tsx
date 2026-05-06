import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MainSlide, { UserRole } from './components/onboarding/Main_Slide';
import CounterBoySlide   from './components/onboarding/CounterBoy_Slide';
import CustomerSlide     from './components/onboarding/Customer_Slide';
import DealerSlide       from './components/onboarding/Dealer_Slide';
import ElectricianSlide  from './components/onboarding/Electrician_Slide';

export default function App() {
  const [activeRole, setActiveRole] = useState<UserRole | null>(null);

  const goBack = () => setActiveRole(null);

  if (activeRole === 'counter-boy') return <View style={s.root}><StatusBar barStyle="dark-content" backgroundColor="#fff"/><CounterBoySlide onBack={goBack} /></View>;
  if (activeRole === 'user')        return <View style={s.root}><StatusBar barStyle="dark-content" backgroundColor="#fff"/><CustomerSlide    onBack={goBack} /></View>;
  if (activeRole === 'dealer')      return <View style={s.root}><StatusBar barStyle="dark-content" backgroundColor="#fff"/><DealerSlide      onBack={goBack} /></View>;
  if (activeRole === 'electrician') return <View style={s.root}><StatusBar barStyle="dark-content" backgroundColor="#fff"/><ElectricianSlide onBack={goBack} /></View>;

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <MainSlide onRoleSelect={setActiveRole} />
    </View>
  );
}

const s = StyleSheet.create({ root: { flex: 1, backgroundColor: '#FFFFFF' } });
