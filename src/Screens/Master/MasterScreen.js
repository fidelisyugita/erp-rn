import React from 'react'
import {
  Box,
  Center,
  Icon,
  IconButton,
  ScrollView,
  SimpleGrid,
  Text,
} from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import { MENU } from '@/Data/Constant'
import useSession from '@/Hooks/useSession'

const MasterScreen = ({ navigation }) => {
  const { userRole } = useSession()

  return (
    <Box flex="1" bgColor="white">
      <ScrollView>
        <SimpleGrid
          columns={3}
          spacingY={4}
          spacingX={10}
          alignItems="center"
          mt="4"
        >
          {MENU[1].menu.map(menu => {
            if (
              !menu.roleAccess.some(ra => {
                return (
                  userRole.some(ur => ur.includes(ra.role)) &&
                  ra.access.includes('read')
                )
              })
            ) {
              return null
            }
            return (
              <Box key={String(menu.id)} alignItems="center">
                <IconButton
                  onPress={() => navigation.navigate(menu.id)}
                  borderRadius="md"
                  colorScheme="primary"
                  variant="solid"
                  p={4}
                  icon={<Icon name={menu.icon} as={MaterialIcons} size="xl" />}
                />
                <Text textAlign="center" width="20">
                  {menu.label}
                </Text>
              </Box>
            )
          })}
        </SimpleGrid>
      </ScrollView>
    </Box>
  )
}

export default MasterScreen
