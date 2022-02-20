import React from 'react'
import { Actionsheet, AlertDialog, Button, Icon, Toast } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import R from 'ramda'

import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { useAccess } from '@/Hooks'
import { getCurrentRoute } from '@/Navigators/utils'
import { downloadFile } from '@/Helper/DownloadHelper'
import { Config } from '@/Config'
import { generatePdfProduct } from '@/Helper/PdfHelper'

const ActionSheet = ({
  isOpen,
  onClose,
  item,
  screenName = '',
  deleteMutation = null,
  deleteFixedCacheKey = '',
  downloadPdfMutation = null,
  downloadFixedCacheKey = '',
  downloadOptions = {},
  downloadPdf,
}) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const currentRoute = getCurrentRoute()
  const { isCanView, isCanEdit, isCanDelete, isCanDownload } = useAccess(
    currentRoute.name,
  )

  const [deleteRequest] = deleteMutation
    ? deleteMutation({ deleteFixedCacheKey })
    : []

  const [downloadPdfRequest] = downloadPdfMutation
    ? downloadPdfMutation({ downloadFixedCacheKey })
    : []

  const [isDeleteOpen, setDeleteOpen] = React.useState(false)

  const onCloseDelete = () => setDeleteOpen(false)

  const cancelRef = React.useRef()

  const onView = () => {
    navigation.navigate(screenName, { type: 'view', item })
    onClose?.()
  }

  const onEdit = () => {
    navigation.navigate(screenName, { type: 'edit', item })
    onClose?.()
  }

  const onDelete = () => {
    setDeleteOpen(true)
  }

  const onDownloadPdf = async () => {
    onClose?.()
    // if (!R.isEmpty(downloadOptions)) {
    //   const request = {
    //     url: `${Config.API_URL}/${downloadOptions?.url}`,
    //     method: downloadOptions?.method,
    //   }

    //   // downloadPdfRequest?.(request)
    //   downloadFile(request)
    // } else {
    //   Toast.show({ description: t('linkNotAvailable') })
    // }
    try {
      await downloadPdf?.(item)
    } catch (error) {
      console.log({ 'onDownloadPdf-error': error })
    }
  }

  const deleteItem = () => {
    onCloseDelete()
    onClose?.()

    const request = {
      id: item.id,
    }

    deleteRequest?.(request)
  }

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          {isCanDownload ? (
            <Actionsheet.Item
              onPress={onDownloadPdf}
              startIcon={
                <Icon
                  as={<MaterialIcons name="picture-as-pdf" />}
                  color="muted.500"
                  mr={3}
                />
              }
            >
              {t('downloadPdf')}
            </Actionsheet.Item>
          ) : null}
          {isCanView ? (
            <Actionsheet.Item
              onPress={onView}
              startIcon={
                <Icon
                  as={<MaterialIcons name="remove-red-eye" />}
                  color="muted.500"
                  mr={3}
                />
              }
            >
              {t('view')}
            </Actionsheet.Item>
          ) : null}
          {isCanEdit ? (
            <Actionsheet.Item
              onPress={onEdit}
              startIcon={
                <Icon
                  as={<MaterialIcons name="edit" />}
                  color="muted.500"
                  mr={3}
                />
              }
            >
              {t('edit')}
            </Actionsheet.Item>
          ) : null}
          {isCanDelete ? (
            <Actionsheet.Item
              onPress={onDelete}
              startIcon={
                <Icon
                  as={<MaterialIcons name="delete" />}
                  color="muted.500"
                  mr={3}
                />
              }
            >
              {t('delete')}
            </Actionsheet.Item>
          ) : null}
        </Actionsheet.Content>
      </Actionsheet>

      {/* Delete Confirmation */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDeleteOpen}
        onClose={onCloseDelete}
        motionPreset={'fade'}
      >
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            {`${t('delete')} ${item.name || ''}`}
          </AlertDialog.Header>
          <AlertDialog.Body>{t('deleteDescription')}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={onCloseDelete}>
              {t('cancel')}
            </Button>
            <Button
              colorScheme="red"
              onPress={onCloseDelete}
              ml={3}
              onPress={deleteItem}
            >
              {t('delete')}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  )
}

export default ActionSheet
