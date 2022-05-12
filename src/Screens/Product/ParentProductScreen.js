import React from 'react'
import {
  Box,
  Image,
  Pressable,
  ScrollView,
  SimpleGrid,
  Spinner,
  Text,
} from 'native-base'
import { useGetProductCategoriesQuery } from '@/Services/modules/product'

const ParentProductScreen = ({ navigation, route }) => {
  const { data: brands = [], isLoading } = useGetProductCategoriesQuery({})
  const selectable = route.params?.selectable || false
  const typeOfTransaction = route.params?.typeOfTransaction || ''

  return (
    <Box flex="1" bgColor="white">
      <ScrollView>
        {isLoading ? <Spinner mt="4" /> : null}
        <SimpleGrid
          columns={3}
          spacingY={4}
          spacingX={10}
          alignItems="center"
          mt="4"
        >
          {brands.map(menu => {
            return (
              <Pressable
                key={String(menu.id)}
                onPress={() =>
                  navigation.navigate(
                    selectable ? 'SelectProductScreen' : 'ProductScreen',
                    { item: menu, typeOfTransaction },
                  )
                }
              >
                <Box
                  alignItems="center"
                  borderWidth="1"
                  borderColor="gray.200"
                  p="2"
                  borderRadius="4"
                >
                  <Image
                    size="md"
                    source={{ uri: menu.imageUrl }}
                    alt="category"
                  />
                  <Text textAlign="center" mt="2" width="20">
                    {menu.name}
                  </Text>
                </Box>
              </Pressable>
            )
          })}
        </SimpleGrid>
      </ScrollView>
    </Box>
  )
}

export default ParentProductScreen
