import React, { useEffect } from 'react'
import { Actionsheet, Icon } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { resetSelectProduct } from '@/Store/Product'
import { useNavigation } from '@react-navigation/native'
import i18n from '@/Translations'
import { generateDeliveryOrder } from '@/Helper/PdfHelper'
import { useDispatch } from 'react-redux'

const ActionSheetAddOption = ({ isOpen, onClose, item }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const onOnline = () => {
    onClose?.()
    navigation.navigate('TransactionOnlineDetailScreen', { type: 'add' })
  }

  const onOffline = () => {
    onClose?.()
    navigation.navigate('TransactionDetailScreen', {
      type: 'add',
    })
    dispatch(resetSelectProduct())
  }

  const onDownloadPdf = async () => {
    onClose?.()
    try {
      await generateDeliveryOrder?.(item)
    } catch (error) {
      console.log({ 'onDownloadPdf-error': error })
    }
  }

  const [actions, setActions] = React.useState([
    {
      id: 'read',
      label: i18n.t('offline'),
      icon: 'remove-red-eye',
      onPress: onOffline,
    },
    {
      id: 'update',
      label: i18n.t('online'),
      icon: 'edit',
      onPress: onOnline,
    },
    {
      id: 'cancel',
      label: i18n.t('cancel'),
      icon: 'delete',
      onPress: onClose,
    },
  ])

  useEffect(() => {
    setActions([
      {
        id: 'read',
        label: i18n.t('standard'),
        icon: 'remove-red-eye',
        onPress: onOffline,
      },
      {
        id: 'update',
        label: i18n.t('barcode'),
        icon: 'edit',
        onPress: onOnline,
      },
      {
        id: 'cancel',
        label: i18n.t('cancel'),
        icon: 'delete',
        onPress: onClose,
      },
    ])
  }, [item])

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content>
        {actions.map(({ label, onPress, id, icon }) => {
          return (
            <Actionsheet.Item key={id} onPress={onPress}>
              {label}
            </Actionsheet.Item>
          )
        })}
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default ActionSheetAddOption
