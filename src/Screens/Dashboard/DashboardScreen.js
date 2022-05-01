import React, { useState } from 'react'
import { Box, Text, VStack, Divider, CheckIcon, Select } from 'native-base'
import moment from 'moment'
import FilterDasbhoard from './Components/FilterDashboard'
import { useTranslation } from 'react-i18next'

const DashboardScreen = () => {
  const { t } = useTranslation()
  const [filterDate, setFilterDate] = useState({
    firstDate: moment().format('YYYY-MM-DD'),
    secondDate: moment().format('YYYY-MM-DD'),
  })
  return (
    <Box flex="1" backgroundColor="white">
      <FilterDasbhoard filterDate={filterDate} setFilterDate={setFilterDate} />
      <VStack
        space="2"
        mt="4"
        mx={'4'}
        borderWidth="1"
        borderColor="gray.200"
        p="2"
        borderRadius="md"
        mb="4"
      >
        <Text>{t('keuntungan')}: </Text>
        <Text>{t('penjualan')}: </Text>
        <Text>{t('reject')}: </Text>
      </VStack>

      <Divider />
      <Select
        selectedValue={sort}
        minWidth="100"
        h="12"
        placeholder={t('sortBy')}
        onValueChange={setSort}
        mr="1"
        _selectedItem={{
          bg: 'primary.500',
          endIcon: <CheckIcon size="5" />,
        }}
      >
        <Select.Item label={t('allStatus')} value="" />
        {buyingStatus.map(ts => (
          <Select.Item key={String(ts.id)} label={ts.name} value={ts.id} />
        ))}
      </Select>
    </Box>
  )
}

export default DashboardScreen
