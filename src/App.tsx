import * as SplashScreen from 'expo-splash-screen'

import theme from './styles/theme'
import React from 'react'

import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components'
import { Routes } from '@routes/'

import {
  Archivo_600SemiBold,
  Archivo_400Regular,
  Archivo_500Medium,
  useFonts,
} from '@expo-google-fonts/archivo'

export default function App() {
  SplashScreen.preventAutoHideAsync()
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  })

  if (!fontsLoaded) {
    return null
  }

  SplashScreen.hideAsync()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

