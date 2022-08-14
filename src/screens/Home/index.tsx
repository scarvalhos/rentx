import React, { useEffect, useState } from 'react'
import Logo from '@assets/logo.svg'

import { PanGestureHandler } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { LoadAnimated } from '@components/LoadAnimated'
import { BackHandler } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'
import { CarDto } from 'src/dtos/carDto'
import { Car } from '@components/Car'
import { api } from '@services/api'

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
} from './styles'

const ButtonAnimatted = Animated.createAnimatedComponent(MyCarsButton)

export function Home() {
  const [cars, setCars] = useState<CarDto[]>()
  const [loading, setloading] = useState(true)

  const theme = useTheme()
  const navigation = useNavigation()

  const positionX = useSharedValue(0)
  const positionY = useSharedValue(0)

  const myCarsButtonStyleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    }
  })

  const onGestureHandler = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX
      positionY.value = ctx.positionY + event.translationY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    },
  })

  const handleDetails = (car: CarDto) => {
    navigation.navigate('CarDetails', { car })
  }

  const handleOpenMyCars = () => {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/cars')

        setCars(data)
      } catch (error) {
        console.log(error)
      } finally {
        setloading(false)
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (
            <TotalCars>Total de {cars?.length || '0'} carros</TotalCars>
          )}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureHandler}>
        <Animated.View style={[myCarsButtonStyleAnimation]}>
          <ButtonAnimatted onPress={handleOpenMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.background_secondary}
            />
          </ButtonAnimatted>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}
