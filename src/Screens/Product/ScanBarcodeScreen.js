import React, { useRef, useState } from 'react'
import { AlertDialog, Box, Button, Text } from 'native-base'
import { Dimensions, StatusBar } from 'react-native'
import { RNCamera } from 'react-native-camera'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { useHeaderHeight } from '@react-navigation/elements'
import { scale, scaleHeight } from '@/Helper/ScaleHelper'
import { useTranslation } from 'react-i18next'

const CAM_VIEW_WIDTH = Dimensions.get('window').width

const leftMargin = scale(125 / 2 - 50)
const topMargin = scaleHeight(222.33 / 2 - 25)
const frameWidth = scale(100)
const frameHeight = scaleHeight(50)

const ScanBarcodeScreen = ({ navigation, route }) => {
  const previousScreen = route?.params?.previousScreen
  const headerHeight = useHeaderHeight()
  const { t } = useTranslation()
  const [CAM_VIEW_HEIGHT] = useState(
    scaleHeight(222.33) - (StatusBar.currentHeight || 0) - headerHeight,
  )
  const [scan] = useState({
    scanAreaX: leftMargin / CAM_VIEW_WIDTH,
    scanAreaY: topMargin / CAM_VIEW_HEIGHT,
    scanAreaWidth: frameWidth / CAM_VIEW_WIDTH,
    scanAreaHeight: frameHeight / CAM_VIEW_HEIGHT,
  })

  const [isOpen, setIsOpen] = React.useState(false)
  const [barcode, setBarcode] = React.useState('')

  const onClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      scanRef?.current?.reactivate()
    }, 3000)
  }

  const cancelRef = React.useRef(null)

  const scanRef = useRef(null)

  const onSuccess = e => {
    if (e.data) {
      setBarcode(e.data)
      setIsOpen(true)
    }
  }

  const onAgree = () => {
    setIsOpen(false)
    if (previousScreen) {
      navigation.navigate(previousScreen, { barcode })
    }
  }

  return (
    <Box flex="1" bgColor="white">
      <QRCodeScanner
        ref={scanRef}
        reactivateTimeout={5000}
        topViewStyle={{ flex: 0 }}
        bottomViewStyle={{ flex: 0 }}
        cameraStyle={{
          flex: 1,
          height: CAM_VIEW_HEIGHT,
        }}
        cameraContainerStyle={{ flex: 1 }}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker
        rectOfInterest={{
          x: scan.scanAreaX,
          y: scan.scanAreaY,
          width: scan.scanAreaWidth,
          height: scan.scanAreaHeight,
        }}
        cameraViewDimensions={{
          width: CAM_VIEW_WIDTH,
          height: CAM_VIEW_HEIGHT,
        }}
        customMarker={
          <Box
            position="absolute"
            width={CAM_VIEW_WIDTH}
            height={CAM_VIEW_HEIGHT}
            left={0}
            top={0}
            alignSelf="center"
            borderLeftWidth={CAM_VIEW_WIDTH / 2 - frameWidth / 2}
            borderRightWidth={CAM_VIEW_WIDTH / 2 - frameWidth / 2}
            borderTopWidth={CAM_VIEW_HEIGHT / 2 - frameHeight / 2}
            borderBottomWidth={CAM_VIEW_HEIGHT / 2 - frameHeight / 2}
            borderColor="primary.500"
            borderRadius={frameWidth / 100}
            opacity={0.5}
          />
        }
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{t('barcode')}</AlertDialog.Header>
          <AlertDialog.Body>
            <Text>
              {`${t('theBarcodeValueIs')} `}
              <Text bold>{barcode}</Text>
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                {t('cancel')}
              </Button>
              <Button colorScheme="primary" onPress={onAgree} px="8">
                {t('ok')}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  )
}

export default ScanBarcodeScreen
