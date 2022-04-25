import React, { useState } from 'react'
import {
  Box,
  CheckIcon,
  IconButton,
  Input,
  ScrollView,
  Select,
  Skeleton,
  useDisclose,
} from 'native-base'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DateRange } from '@/Components/Atoms'
import { dateRangeConverter } from '@/Helper/DateHelper'
import {
  useGetBuyingStatusQuery,
  useGetBuyingTypeQuery,
} from '@/Services/modules/buying'

const FilterTransaction = ({
  setFilterStatus,
  filterStatus,
  setFilterType,
  filterType,
  setFilterDate,
  filterDate,
}) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclose()
  const {
    data: buyingStatus = [],
    isFetching: isFetchingBuyingStatus,
  } = useGetBuyingStatusQuery({
    params: {
      page: 0,
      limit: 100,
    },
  })

  const {
    data: buyingTypes = [],
    isFetching: isFetchingBuyingTypes,
  } = useGetBuyingTypeQuery({
    params: {
      page: 0,
      limit: 100,
    },
  })

  return (
    <>
      <DateRange
        isOpen={isOpen}
        onClose={onClose}
        setRange={setFilterDate}
        selectedRange={filterDate}
      />
      <Box>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          mt="2"
          _contentContainerStyle={{
            px: '4',
          }}
        >
          <Skeleton h="12" w="100" isLoaded={!isFetchingBuyingStatus} mr="1">
            <Select
              selectedValue={filterStatus}
              minWidth="100"
              h="12"
              placeholder={t('allStatus')}
              onValueChange={setFilterStatus}
              mr="1"
              _selectedItem={{
                bg: 'primary.500',
                endIcon: <CheckIcon size="5" />,
              }}
            >
              <Select.Item label={t('allStatus')} value="" />
              {buyingStatus.map(ts => (
                <Select.Item
                  key={String(ts.id)}
                  label={ts.name}
                  value={ts.id}
                />
              ))}
            </Select>
          </Skeleton>
          <Skeleton h="12" w="100" isLoaded={!isFetchingBuyingTypes} mr="1">
            <Select
              selectedValue={filterType}
              minWidth="100"
              h="12"
              placeholder={t('allType')}
              onValueChange={setFilterType}
              mr="1"
              _selectedItem={{
                bg: 'primary.500',
                endIcon: <CheckIcon size="5" />,
              }}
            >
              <Select.Item label={t('allType')} value="" />
              {buyingTypes.map(tp => (
                <Select.Item
                  key={String(tp.id)}
                  label={tp.name}
                  value={tp.id}
                />
              ))}
            </Select>
          </Skeleton>
          <Input
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
        </ScrollView>
      </Box>
    </>
  )
}

export default FilterTransaction
