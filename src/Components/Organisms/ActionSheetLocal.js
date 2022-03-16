import React from 'react'
import { Actionsheet, Icon } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import i18n from '@/Translations'
import { useNavigation } from '@react-navigation/native'

const ActionSheetLocal = ({
  actionScreen,
  isOpen,
  onClose,
  item,
  onDelete,
  pointer,
}) => {
  const navigation = useNavigation()

  const onView = () => {
    navigation.navigate(actionScreen, { type: 'view', item })
  }

  const onEdit = () => {
    navigation.navigate(actionScreen, { type: 'edit', item })
  }

  const onDeleteItem = () => {
    onDelete?.(pointer)
    onClose()
  }

  const [actions] = React.useState([
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
      id: 'delete',
      label: i18n.t('delete'),
      icon: 'delete',
      onPress: onDeleteItem,
    },
    {
      id: 'cancel',
      label: i18n.t('cancel'),
      icon: 'delete',
      onPress: onClose,
    },
  ])

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

export default ActionSheetLocal
