import React, { useState } from 'react'
import ArrowSvg from '@assets/arrow.svg'

import { getPlatformDate } from 'src/utils/getPlatformDate'
import { useNavigation, useRoute } from '@react-navigation/native'
import { BackButton } from '@components/BackButton'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'styled-components'
import { Button } from '@components/Button'
import { CarDto } from 'src/dtos/carDto'
import { format } from 'date-fns/esm'

import {
  generateInterval,
  MarkedDateProps,
  DayProps,
  Calendar,
} from '@components/Calendar'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles'

interface RentalPeriod {
  startFormatted: string
  endFormatted: string
}

interface Params {
  car: CarDto
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  )
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  )
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )

  const theme = useTheme()
  const navigation = useNavigation()

  const { params } = useRoute()
  const { car } = params as Params

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleSchedulingDetails = () => {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    })
  }

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Header>
        <BackButton color={theme.colors.shape} onPress={handleGoBack} />

        <Title>
          Escolha uma{`\n`}
          data de início e{`\n`}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleSchedulingDetails}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  )
}
