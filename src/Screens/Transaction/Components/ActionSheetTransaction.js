import React, { useEffect } from 'react'
import { Actionsheet, Icon } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import i18n from '@/Translations'
import { useNavigation } from '@react-navigation/native'
import { generateDeliveryOrder } from '@/Helper/PdfHelper'

const ActionSheetTransaction = ({ isOpen, onClose, item }) => {
  const navigation = useNavigation()

  const onView = () => {
    onClose?.()
    navigation.navigate('TransactionDetailScreen', { type: 'view', item })
  }

  const onEdit = () => {
    onClose?.()
    navigation.navigate('TransactionUpdateScreen', { item })
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
      id: 'downloadPdf',
      label: i18n.t('downloadPdf'),
      icon: 'picture-as-pdf',
      onPress: onDownloadPdf,
    },
    {
      id: 'read',
      label: i18n.t('view'),
      icon: 'remove-red-eye',
      onPress: onView,
    },
    {
      id: 'update',
      label: i18n.t('edit'),
      icon: 'edit',
      onPress: onEdit,
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
        id: 'downloadPdf',
        label: i18n.t('downloadPdf'),
        icon: 'picture-as-pdf',
        onPress: onDownloadPdf,
      },
      {
        id: 'read',
        label: i18n.t('view'),
        icon: 'remove-red-eye',
        onPress: onView,
      },
      {
        id: 'update',
        label: i18n.t('edit'),
        icon: 'edit',
        onPress: onEdit,
      },
      {
        id: 'cancel',
        label: i18n.t('cancel'),
        icon: 'close',
        onPress: onClose,
      },
    ])
  }, [item])

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content>
        {actions.map(({ label, onPress, id, icon }) => {
          return (
            <Actionsheet.Item
              key={id}
              onPress={onPress}
              startIcon={
                <Icon
                  as={<MaterialIcons name={icon} />}
                  color="muted.500"
                  mr={3}
                />
              }
            >
              {label}
            </Actionsheet.Item>
          )
        })}
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default ActionSheetTransaction
