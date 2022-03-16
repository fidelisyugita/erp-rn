import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Image,
  Input,
  Modal,
  Text,
  Toast,
  ToastProvider,
  useToast,
} from 'native-base'
import { useTranslation } from 'react-i18next'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatMoney, formatNumber, isNumeric } from '@/Helper/NumberHelper'

const SelectProductDetailScreen = ({
  isOpen = false,
  onClose,
  onCancel,
  onAdd,
  item,
}) => {
  const { t } = useTranslation()
  const [amount, setAmount] = useState(1)
  // const toast = useToast()

  useEffect(() => {
    if (isOpen) {
      setAmount(1)
    }
  }, [isOpen])

  const onPlus = () => {
    setAmount(amount + 1)
  }

  const onMinus = () => {
    setAmount(amount - 1)
  }

  const onChangeValue = val => {
    setAmount(isNumeric(val) ? Number(val) : 0)
  }
  const onAddProduct = () => {
    if (amount > item?.stock) {
      Toast.show({ title: t('stockNotAvailable'), placement: 'top' })
      return
    }

    onAdd?.({ ...item, amount })
    onClose?.()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      avoidKeyboard
      closeOnOverlayClick={false}
    >
      <Modal.Content>
        <Modal.Header>{t('addProduct')}</Modal.Header>
        <Modal.Body>
          <Image
            alt={t('product')}
            alignSelf="center"
            borderRadius="2"
            size="2xl"
            source={{
              uri: item?.imageUrl || '',
            }}
            mb="4"
          />
          <Attribute label={t('sku')} value={item?.sku} />
          <Attribute label={t('name')} value={item?.name} />
          <Attribute label={t('brand')} value={item?.brand?.name} />
          <Attribute label={t('color')} value={item?.color} />
          <Attribute label={t('size')} value={item?.size} />
          <Attribute
            label={t('sellingPrice')}
            value={formatMoney(item?.sellingPrice)}
          />
          <Attribute
            label={t('stock')}
            value={`${formatNumber(item?.stock)} ${
              item?.measureUnit?.name || ''
            }`}
          />
        </Modal.Body>
        <Modal.Footer justifyContent="space-between">
          <Box>
            <Input
              placeholder="Total"
              w="150px"
              textAlign="center"
              keyboardType="number-pad"
              value={formatNumber(amount)}
              onChangeText={onChangeValue}
              maxLength={5}
              InputLeftElement={
                <IconButton
                  variant="solid"
                  disabled={amount < 2}
                  isDisabled={amount < 2}
                  onPress={onMinus}
                  _icon={{
                    as: MaterialIcons,
                    name: 'minus',
                  }}
                />
              }
              InputRightElement={
                <IconButton
                  variant="solid"
                  onPress={onPlus}
                  _icon={{
                    as: MaterialIcons,
                    name: 'plus',
                  }}
                />
              }
            />
          </Box>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}>
              {t('cancel')}
            </Button>
            <Button px="4" onPress={onAddProduct}>
              {t('add')}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

const Attribute = ({ label, value }) => {
  return (
    <Text>
      {label}: <Text bold>{value}</Text>
    </Text>
  )
}

export default SelectProductDetailScreen
