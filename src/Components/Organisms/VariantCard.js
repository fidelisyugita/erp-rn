import React from 'react'
import { Pressable, Text, useDisclose, VStack } from 'native-base'
import { useTranslation } from 'react-i18next'
import ActionSheetLocal from './ActionSheetLocal'
import { formatMoney, formatNumber } from '@/Helper/NumberHelper'
import { generatePdfProduct } from '@/Helper/PdfHelper'

const VariantCard = ({ item, pointer, onDelete }) => {
  const { t } = useTranslation()

  const { isOpen, onOpen, onClose } = useDisclose()

  const onPress = () => {
    onOpen()
  }

  return (
    <>
      <Pressable onPress={onPress}>
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
            {t('stock')}: {formatNumber(item.stock)}
          </Text>
          <Text>
            {t('buyingPrice')}: {formatMoney(item.buyingPrice)}
          </Text>
          <Text>
            {t('sellingPrice')}: {formatMoney(item.sellingPrice)}
          </Text>
          <Text>
            {t('sold')}: {formatNumber(item.sold)}
          </Text>
        </VStack>
      </Pressable>

      <ActionSheetLocal
        isOpen={isOpen}
        onClose={onClose}
        item={item}
        pointer={pointer}
        actionScreen="ProductVariantScreen"
        onDelete={onDelete}
        downloadPdf={generatePdfProduct}
      />
    </>
  )
}

export default VariantCard
