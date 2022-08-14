import React from 'react'

import { BorderlessButtonProps } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'
import { Container } from './styles'
import { useTheme } from 'styled-components'

interface BackButtonProps extends BorderlessButtonProps {
  color?: string
}

export const BackButton: React.FC<BackButtonProps> = ({ color, ...rest }) => {
  const theme = useTheme()

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ?? theme.colors.text}
      />
    </Container>
  )
}
