import React from 'react'

import { Container, Title } from './styles'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

interface ButtonProps {
  title: string
  color?: string
  onPress: () => void
  enabled?: boolean
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}) => {
  const theme = useTheme()

  return (
    <Container
      enabled={enabled}
      color={color}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  )
}
