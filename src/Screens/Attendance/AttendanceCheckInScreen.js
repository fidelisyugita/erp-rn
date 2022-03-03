import React, { useState } from 'react'
import { Box, Button, Image, Text } from 'native-base'
import { useTranslation } from 'react-i18next'
import { UploadImage } from '@/Components/Organisms'
import { Images } from '@/Theme'
import { useAddAttendanceMutation } from '@/Services/modules/attendance'

const AttendanceCheckInScreen = () => {
  const { t } = useTranslation()
  const [uploadTypes] = useState(['cancel', 'capture'])
  const [image, setImage] = useState('')
  const [isImageLoading, setImageLoading] = useState(false)

  const [submitRequest] = useAddAttendanceMutation()

  const submit = () => {
    const request = {
      body: {
        isIn: true,
        imageBase64: image,
      },
    }

    submitRequest(request)
  }

  return (
    <Box flex={1} bgColor="white" paddingX="4">
      <Image
        alignSelf="center"
        size="4/6"
        alt="fallback text"
        borderRadius="4"
        source={image ? { uri: image } : Images().profilePlaceholder}
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        mb="8"
        fallbackElement={
          <Box
            size="4/6"
            bgColor="gray.500"
            borderRadius="4"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontSize="4xl">
              {t('image')}
            </Text>
          </Box>
        }
      />
      <UploadImage
        types={uploadTypes}
        onChangeValue={setImage}
        cameraType="front"
      >
        {t('takePicture')}
      </UploadImage>
      <Button mt="6" onPress={submit} isDisabled={!image}>
        {t('submit')}
      </Button>
    </Box>
  )
}

export default AttendanceCheckInScreen
