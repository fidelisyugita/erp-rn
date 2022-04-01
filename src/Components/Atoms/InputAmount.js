import React from 'react'
import { IconButton, Input } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatNumber } from '@/Helper/NumberHelper'
import { useTranslation } from 'react-i18next'

const InputAmount = ({
  value,
  onPlus,
  onMinus,
  disabled = false,
  disabledPlus = false,
  onChangeValue,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <Input
      placeholder={t('amount')}
      size="xs"
      textAlign="center"
      keyboardType="number-pad"
      value={formatNumber(value)}
      // onChangeText={onChangeValue}
      maxLength={5}
      isDisabled={disabled}
      InputLeftElement={
        <IconButton
          variant="solid"
          disabled={disabled || value < 1}
          isDisabled={disabled || value < 1}
          onPress={onMinus}
          _icon={{
            as: MaterialCommunityIcons,
            name: 'minus',
          }}
        />
      }
      InputRightElement={
        <IconButton
          variant="solid"
          disabled={disabled || disabledPlus}
          isDisabled={disabled || disabledPlus}
          onPress={onPlus}
          _icon={{
            as: MaterialCommunityIcons,
            name: 'plus',
          }}
        />
      }
      {...rest}
    />
  )
}

export default InputAmount
