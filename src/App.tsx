import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import type { RootStackParamList } from './navigation';
import { Dashboard, GitHub, Login, Profile, Register } from './pages';
import { store, useAppSelector, useGetProfileQuery } from './shared/src/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  const { isLoading } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#e94560' />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#16213e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: '#1a1a2e',
        },
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name='Dashboard'
            component={Dashboard}
            options={{ title: 'Dashboard' }}
          />
          <Stack.Screen
            name='Profile'
            component={Profile}
            options={{ title: 'Profile' }}
          />
          <Stack.Screen
            name='GitHub'
            component={GitHub}
            options={{ title: 'GitHub' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Register'
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
});

export default App;
