import React from 'react'
import { Actionsheet, Button, Toast, useDisclose } from 'native-base'
import { useTranslation } from 'react-i18next'
import * as ImagePicker from 'react-native-image-picker'
import i18n from '@/Translations'

const includeExtra = true

const actions = [
  {
    title: i18n.t('takeImage'),
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
      quality: 0.5,
      maxHeight: 200,
      maxWidth: 200,
    },
  },
  {
    title: i18n.t('selectImage'),
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
      quality: 0.5,
    },
  },
  { title: i18n.t('cancel'), type: 'cancel' },
]

const UploadImage = ({ onChangeValue }) => {
  const { isOpen, onOpen, onClose } = useDisclose()
  const { t } = useTranslation()

  const onAction = async (type, options) => {
    try {
      if (type == 'capture') {
        const result = await ImagePicker.launchCamera(options)
        actionResult(result)
      } else if (type == 'cancel') {
        onClose()
      } else {
        const result = await ImagePicker.launchImageLibrary(options)
        actionResult(result)
      }
    } catch (error) {
      Toast.show({ description: error.message, status: 'error' })
    }
  }

  const actionResult = result => {
    onClose()

    if (result.assets) {
      const assets = result.assets[0]
      const base64 = `data:${assets.type};base64, ${assets.base64}`
      onChangeValue(base64)
    } else if (result.errorCode) {
      Toast.show({ description: t(`camera.error.${result.errorCode}`) })
    } else if (result.errorMesage) {
      Toast.show({ description: result.errorMessage })
    } else if (result.didCancel) {
      Toast.show({ description: t('cancelled') })
    }
  }

  return (
    <>
      <Button ml="4" px="4" onPress={onOpen}>
        {t('upload')}
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {actions.map(action => (
            <Actionsheet.Item
              key={action.title}
              onPress={() => onAction(action.type, action.options)}
            >
              {action.title}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

export default UploadImage
