import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GetStartedScreen } from './src/screens/GetStartedScreen';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return <GetStartedScreen onContinue={() => setIsStarted(true)} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen onLogout={() => setIsStarted(false)} />
    </GestureHandlerRootView>
  );
}
