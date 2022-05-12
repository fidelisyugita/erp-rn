import React from 'react'
import { HStack, IconButton, Input, Text, useDisclose } from 'native-base'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DateRange } from '@/Components/Atoms'
import { dateRangeConverter } from '@/Helper/DateHelper'

const FilterDasbhoard = ({ setFilterDate, filterDate }) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclose()

  return (
    <>
      <DateRange
        isOpen={isOpen}
        onClose={onClose}
        setRange={setFilterDate}
        selectedRange={filterDate}
      />
      <HStack px="4" mt="2" alignItems={'center'}>
        <Text fontSize="20" mr="4">
          {t('periode')}
        </Text>
        <Input
          maxWidth="1/2"
          value={dateRangeConverter(filterDate)}
          backgroundColor="white"
          isDisabled
          InputRightElement={
            <IconButton
              onPress={onOpen}
              _icon={{
                as: MaterialCommunityIcons,
                name: 'calendar',
                size: '6',
              }}
            />
          }
        />
      </HStack>
    </>
  )
}

export default FilterDasbhoard
