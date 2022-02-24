import React, { useState, useEffect } from 'react'
import { Box, Image, Text } from 'native-base'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { UploadImage } from '@/Components/Organisms'

const AttendanceScreen = () => {
  const { t } = useTranslation()
  return (
    <Box flex={1} bgColor="white" paddingX="4">
      <Image
        size={150}
        alt="fallback text"
        borderRadius="4"
        source={{}}
        fallbackElement={
          <Box
            w="150"
            h="150"
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
      <UploadImage />
    </Box>
  )
}

export default AttendanceScreen
