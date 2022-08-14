import React, { useEffect, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { getAccessoryIcon } from 'src/utils/getAccessoryIcon'
import { getPlatformDate } from 'src/utils/getPlatformDate'
import { ImageSlider } from '@components/ImageSlider'
import { BackButton } from '@components/BackButton'
import { Accessory } from '@components/Accessory'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { Button } from '@components/Button'
import { CarDto } from 'src/dtos/carDto'
import { format } from 'date-fns'
import { money } from 'src/utils/helpers'
import { Alert } from 'react-native'
import { api } from '@services/api'

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'

interface Params {
  car: CarDto
  dates: string[]
}

interface RentalPeriod {
  startFormatted: string
  endFormatted: string
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )

  const theme = useTheme()
  const navigation = useNavigation()

  const { params } = useRoute()
  const { car, dates } = params as Params

  const rentTotal = Number(dates.length * car.rent.price)

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleSchedulingCompleted = async () => {
    setLoading(true)

    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ]

    api.post('/schedules_byuser/', {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    })

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => navigation.navigate('SchedulingComplete'))
      .catch(() => {
        Alert.alert('Não foi possível confirmar o agendamento.')
        setLoading(false)
      })
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    })
  }, [])

  return (
    <Container>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.background_secondary}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.title}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`${money(car.rent.price)} x${
              dates.length
            } diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{money(rentTotal)}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleSchedulingCompleted}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  )
}
