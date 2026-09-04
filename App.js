import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigation';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <>
    <AuthProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </AuthProvider>
    </>
  );
}