import styled from 'styled-components/native'

import { FlatList, FlatListProps } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import { CarDto } from 'src/dtos/carDto'

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
  width: 100%;
  height: 113px;
  background: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;

  padding: 32px 24px;
`

export const HeaderContent = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`

export const CarList = styled(
  FlatList as new (props: FlatListProps<CarDto>) => FlatList<CarDto>
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollInicator: false,
})``

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.main};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 13px;
  right: 22px;
`
