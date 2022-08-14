import React from 'react'

import { Container, Name } from './styles'
import { SvgProps } from 'react-native-svg'

interface Props {
  name: string
  icon: React.FC<SvgProps>
}

export const Accessory: React.FC<Props> = ({ name, icon: Icon }) => {
  return (
    <Container>
      <Icon width={32} height={32} />
      <Name>{name}</Name>
    </Container>
  )
}
