import React from 'react'

import { getAccessoryIcon } from 'src/utils/getAccessoryIcon'
import { RectButtonProps } from 'react-native-gesture-handler'
import { CarDto } from 'src/dtos/carDto'
import { money } from 'src/utils/helpers'

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles'

interface CarProps extends RectButtonProps {
  data: CarDto
}

export const Car: React.FC<CarProps> = ({ data, ...rest }) => {
  const MotorIcon = getAccessoryIcon(data.fuel_type)
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{money(data.rent.price)}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  )
}
