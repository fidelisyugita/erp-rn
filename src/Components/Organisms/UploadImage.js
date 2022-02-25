import React from 'react'
import { PermissionsAndroid } from 'react-native'
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
      quality: 0.7,
      maxHeight: 480,
      maxWidth: 480,
    },
  },
  {
    title: i18n.t('selectImage'),
    type: 'library',
    options: {
      maxHeight: 480,
      maxWidth: 480,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
      quality: 0.7,
    },
  },
  { title: i18n.t('cancel'), type: 'cancel' },
]

const UploadImage = ({
  onChangeValue,
  children,
  types = ['capture', 'library', 'cancel'],
  cameraType = 'back',
  buttonProps,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose()
  const { t } = useTranslation()

  const onAction = async (type, options) => {
    try {
      if (type == 'capture') {
        const accessCamera = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        )
        if (accessCamera === PermissionsAndroid.RESULTS.GRANTED) {
          const result = await ImagePicker.launchCamera({
            ...options,
            cameraType,
          })
          console.log({ 'onAction-result': result })
          actionResult(result)
        }
      } else if (type == 'cancel') {
        onClose()
      } else {
        const result = await ImagePicker.launchImageLibrary(options)
        actionResult(result)
      }
    } catch (error) {
      console.log({ 'onAction-error': error })
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

  const renderAction = action => {
    if (!types.includes(action.type)) return null

    return (
      <Actionsheet.Item
        key={action.title}
        onPress={() => onAction(action.type, action.options)}
      >
        {action.title}
      </Actionsheet.Item>
    )
  }

  return (
    <>
      <Button px="4" onPress={onOpen} {...buttonProps}>
        {children && children}
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>{actions.map(renderAction)}</Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

export default UploadImage
