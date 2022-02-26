import React from 'react'
import {
  Box,
  Image,
  Pressable,
  ScrollView,
  SimpleGrid,
  Text,
} from 'native-base'
import { useGetProductCategoriesQuery } from '@/Services/modules/product'

const ParentProductScreen = ({ navigation }) => {
  const { data: brands = [] } = useGetProductCategoriesQuery({})

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
          {brands.map(menu => {
            return (
              <Pressable
                key={String(menu.id)}
                onPress={() =>
                  navigation.navigate('ProductScreen', { item: menu })
                }
              >
                <Box alignItems="center">
                  <Image
                    size="md"
                    source={{ uri: menu.imageUrl }}
                    alt="category"
                  />
                  <Text textAlign="center" width="20">
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
