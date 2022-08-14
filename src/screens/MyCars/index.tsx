import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { LoadAnimated } from '@components/LoadAnimated'
import { BackButton } from '@components/BackButton'
import { AntDesign } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'styled-components'
import { FlatList } from 'react-native'
import { CarDto } from 'src/dtos/carDto'
import { Car } from '@components/Car'
import { api } from '@services/api'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'

interface CarProps {
  id: string
  user_id: string
  car: CarDto
  startDate: string
  endDate: string
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleDetails = (car: CarDto) => {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('schedules_byuser?user_id=1')
        setCars(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Header>
        <BackButton color={theme.colors.shape} onPress={handleGoBack} />

        <Title>
          Seus agendamentos{'\n'}
          estão aqui.
        </Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      {loading ? (
        <LoadAnimated />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} onPress={() => handleDetails(item.car)} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}
