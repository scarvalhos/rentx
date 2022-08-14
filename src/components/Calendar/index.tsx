import React from 'react'

import { generateInterval } from './generateInterval'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'
import { ptBR } from './localeConfig'

import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateCallbackHandler,
} from 'react-native-calendars'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

interface MarkedDateProps {
  [date: string]: {
    color: string
    textColor: string
    disabled?: boolean
    disabledTouchEvent?: boolean
  }
}

interface CalendarProps {
  markedDates: MarkedDateProps
  onDayPress: DateCallbackHandler
}

interface DayProps {
  dateString: string
  day: number
  month: number
  year: number
  timestamp: number
}

const Calendar: React.FC<CalendarProps> = ({ markedDates, onDayPress }) => {
  const theme = useTheme()
  return (
    <CustomCalendar
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      firstDay={1}
      minDate={String(new Date())}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_500,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      renderArrow={(direction) => (
        <Feather
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={24}
          color={theme.colors.text}
        />
      )}
    />
  )
}

export { Calendar, MarkedDateProps, DayProps, generateInterval }
