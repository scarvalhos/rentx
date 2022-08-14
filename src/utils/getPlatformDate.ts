import { Platform } from 'react-native'
import { addDays } from 'date-fns'

export const getPlatformDate = (date: Date) => {
  if (Platform.OS === 'ios') {
    return addDays(date, 1)
  } else {
    return date
  }
}
