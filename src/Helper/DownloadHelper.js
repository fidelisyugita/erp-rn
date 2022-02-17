import RNFetchBlob from 'rn-fetch-blob'
import { Toast } from 'native-base'
import { store } from '@/Store'
import i18n from '@/Translations'

export const downloadFile = params => {
  const { url, method = 'GET', filename = '' } = params
  const accessToken = store.getState().session?.accessToken
  const {
    dirs: { DownloadDir, DocumentDir },
  } = RNFetchBlob.fs

  const isIOS = Platform.OS === 'ios'

  const directoryPath = Platform.select({
    ios: DocumentDir,
    android: DownloadDir,
  })

  const newFilename = `${filename}_${new Date().getTime()}.pdf`

  const filePath = `${directoryPath}/${newFilename}`

  const fileExt = 'pdf'

  const mimeType = 'application/pdf'

  const configOptions = Platform.select({
    ios: {
      fileCache: true,
      path: filePath,
      appendExt: fileExt,
      notification: true,
    },
    android: {
      fileCache: true,
      appendExt: fileExt,
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: mimeType,
        title: newFilename,
        mediaScannable: true,
        notification: true,
        path: filePath,
      },
    },
  })

  RNFetchBlob.config(configOptions)
    .fetch(method, url, {
      Authorization: `Bearer ${accessToken}`,
      // more headers  ..
    })
    .progress((received, total) => {
      console.log('progress ' + Math.floor((received / total) * 100) + '%')
    })
    .then(res => {
      Toast.show({ description: i18n.t('downloadSuccess') })
      if (isIOS) {
        RNFetchBlob.ios.previewDocument(res.path())
      }
    })
    // Something went wrong:
    .catch(err => {
      console.log(err.message)
      Toast.show({ description: error.message })
      // error handling
    })
}
