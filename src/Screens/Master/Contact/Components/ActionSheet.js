import React from 'react'
import {
  Actionsheet,
  AlertDialog,
  Avatar,
  Button,
  Icon,
  Text,
  Toast,
} from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommnutiyIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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
  approveMutation = null,
  approveFixedCacheKey = '',
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

  const [approveRequest] = approveMutation
    ? approveMutation({ approveFixedCacheKey })
    : []

  const [isDeleteOpen, setDeleteOpen] = React.useState(false)

  const [isApproveOpen, setApproveOpen] = React.useState(false)

  const onCloseDelete = () => setDeleteOpen(false)
  const onCloseApprove = () => setApproveOpen(false)

  const cancelDeleteRef = React.useRef()
  const cancelApproveRef = React.useRef()

  const onViewTransaction = () => {
    navigation.navigate('ContactTransactionScreen', { item })
  }

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

  const onApprove = () => {
    setApproveOpen(true)
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

  const approveItem = () => {
    onCloseApprove()
    onClose?.()

    const request = {
      id: item.id,
    }

    approveRequest?.(request)
  }

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          {isCanEdit && approveMutation ? (
            <Actionsheet.Item
              onPress={onApprove}
              startIcon={
                <Icon
                  as={<MaterialIcons name="check" />}
                  color="muted.500"
                  mr={3}
                />
              }
            >
              {t('approve')}
            </Actionsheet.Item>
          ) : null}
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
          <Actionsheet.Item
            onPress={onViewTransaction}
            startIcon={
              <Icon
                as={<MaterialCommnutiyIcons name="script-text-outline" />}
                color="muted.500"
                mr={3}
              />
            }
          >
            {t('transaction')}
          </Actionsheet.Item>
          {/* {isCanView ? ( */}
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
          {/* ) : null} */}
          {isCanEdit && !approveMutation ? (
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
        leastDestructiveRef={cancelDeleteRef}
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
            <Button ref={cancelDeleteRef} onPress={onCloseDelete}>
              {t('cancel')}
            </Button>
            <Button colorScheme="red" ml={3} onPress={deleteItem}>
              {t('delete')}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      {/* Approve Confirmation */}
      {approveMutation ? (
        <AlertDialog
          leastDestructiveRef={cancelApproveRef}
          isOpen={isApproveOpen}
          onClose={onCloseApprove}
          motionPreset={'fade'}
        >
          <AlertDialog.Content>
            <AlertDialog.Header fontSize="lg" fontWeight="bold">
              {`${t('approve')} ${item.createdBy?.name || ''}`}
            </AlertDialog.Header>
            <AlertDialog.Body>
              <Avatar
                alignSelf="center"
                borderRadius="2"
                size="full"
                height="64"
                source={{
                  uri: item.imageUrl,
                }}
              />
              {/* <Text>{t('approveDescription')}</Text> */}
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button ref={cancelApproveRef} onPress={onCloseApprove}>
                {t('cancel')}
              </Button>
              <Button colorScheme="red" ml={3} onPress={approveItem}>
                {t('approve')}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      ) : null}
    </>
  )
}

export default ActionSheet
