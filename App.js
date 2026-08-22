import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigation';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}