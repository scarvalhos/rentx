import React from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { getAccessoryIcon } from 'src/utils/getAccessoryIcon'
import { ImageSlider } from '@components/ImageSlider'
import { BackButton } from '@components/BackButton'
import { StyleSheet } from 'react-native'
import { Accessory } from '@components/Accessory'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'styled-components'
import { Button } from '@components/Button'
import { CarDto } from 'src/dtos/carDto'
import { money } from 'src/utils/helpers'

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from './styles'

interface Params {
  car: CarDto
}

export function CarDetails() {
  const theme = useTheme()

  const navigation = useNavigation()
  const { params } = useRoute()
  const { car } = params as Params

  const scrollY = useSharedValue(0)
  const scrollHandle = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    }
  })

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleScheduling = () => {
    navigation.navigate('Scheduling', {
      car,
    })
  }

  return (
    <Container>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleGoBack} />
        </Header>
        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{money(car.rent.price)}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((item) => (
            <Accessory
              key={item.type}
              name={item.name}
              icon={getAccessoryIcon(item.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleScheduling}
        />
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
})
