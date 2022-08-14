import styled from 'styled-components/native'

import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  padding-top: 60px;
`

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  margin-top: 40px;
`

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  line-height: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  text-align: center;
  margin-top: 16px;
`

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin: 160px 0 80px;
`
