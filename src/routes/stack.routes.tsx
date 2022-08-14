import { createStackNavigator } from '@react-navigation/stack'
import { SchedulingComplete } from '@screens/SchedulingComplete'
import { SchedulingDetails } from '@screens/SchedulingDetails'
import { Scheduling } from '@screens/Scheduling'
import { CarDetails } from '@screens/CarDetails'
import { MyCars } from '@screens/MyCars'
import { Splash } from '@screens/Splash'
import { Home } from '@screens/Home'

const { Navigator, Screen } = createStackNavigator()

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  )
}
