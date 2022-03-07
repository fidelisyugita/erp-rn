import React from 'react'
import { Pressable, Text, VStack } from 'native-base'
import { useTranslation } from 'react-i18next'

const VariantCard = ({item, pointer}) => {
  const { t } = useTranslation()

  return (
    <Pressable onPress={() => {}}>
      <VStack
        borderWidth="1"
        borderColor="gray.200"
        borderRadius="sm"
        shadow="1"
        backgroundColor="white"
        p="2"
        mt={pointer !== 0 ? '2' : '0'}
      >
        {item.sku ? (
          <Text>
            {t('sku')}: {item.sku}
          </Text>
        ) : null}
        {item.barcode ? (
          <Text>
            {t('barcode')}: {item.barcode}
          </Text>
        ) : null}
        <Text>
          {t('size')}: {item.size}
        </Text>
        <Text>
          {t('stock')}: {item.stock}
        </Text>
        <Text>
          {t('buyingPrice')}: {item.buyingPrice}
        </Text>
        <Text>
          {t('sellingPrice')}: {item.sellingPrice}
        </Text>
        <Text>
          {t('sold')}: {item.sold}
        </Text>
      </VStack>
    </Pressable>
  )
}

export default VariantCard
