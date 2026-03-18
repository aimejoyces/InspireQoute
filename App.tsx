import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './src/screens/HomeScreen';
import { GetStartedScreen } from './src/screens/GetStartedScreen';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return <GetStartedScreen onContinue={() => setIsStarted(true)} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen />
    </GestureHandlerRootView>
  );
}
