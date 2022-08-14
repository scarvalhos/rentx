import React from 'react'
import LottieView from 'lottie-react-native'
import LoadCar from '@assets/load_animated.json'

import { Container } from './styles'

export function LoadAnimated() {
  return (
    <Container>
      <LottieView
        source={LoadCar}
        style={{ height: 160 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  )
}
