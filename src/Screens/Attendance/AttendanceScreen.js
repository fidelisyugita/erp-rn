import React, { useRef } from 'react'
import {
  Box,
  Input,
  Icon,
  FlatList,
  Text,
  Spinner,
  Pressable,
  useTheme,
  IconButton,
  useDisclose,
  HStack,
  Avatar,
  VStack,
  Spacer,
} from 'native-base'
import { RefreshControl } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'

import { usePagination, useAccess } from '@/Hooks'
import { ActionSheet } from '@/Components/Organisms'
import {
  useLazyGetAttendancesQuery,
  useApproveAttendanceMutation,
} from '@/Services/modules/attendance'
import numbro from 'numbro'
import { generatePdfProduct } from '@/Helper/PdfHelper'
import moment from 'moment'
import { ATTENDANCE_APPROVE_STATUS } from '@/Data/Constant'

const today = moment().format('YYYY-MM-DD')

const AttendanceScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { isCanAdd } = useAccess()
  const { isOpen, onOpen, onClose } = useDisclose()
  const [
    { list, onRefresh, onLoadMore, keyExtractor, renderEmpty, renderFooter },
    { isSearch, isRefresh, isFirstLoad },
  ] = usePagination(useLazyGetAttendancesQuery, {
    params: { startDate: today, endDate: today },
  })

  const [
    approveTrigger,
    { isSuccess: isSuccessApprove, reset: resetApprove },
  ] = useApproveAttendanceMutation({
    fixedCacheKey: 'approve-attendance',
  })

  const [selectedItem, setSelectedItem] = React.useState({})

  React.useEffect(() => {
    if (isSuccessApprove) {
      onRefresh()
      resetApprove()
    }
  }, [isSuccessApprove])

  const filterDateRef = useRef(null)

  const onPressItem = item => {
    filterDateRef?.current?.blur()
    setSelectedItem(item)
    onOpen()
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable isDisabled={item.approvedBy} onPress={() => onPressItem(item)}>
        {({ isPressed }) => {
          return (
            <Box
              borderBottomWidth={1}
              borderColor="coolGray.200"
              py="2"
              bg={isPressed ? 'coolGray.200' : 'white'}
            >
              <HStack alignItems="center" space={2}>
                <Avatar
                  borderRadius="2px"
                  size="48px"
                  source={{
                    uri: item.imageUrl,
                  }}
                />
                <VStack width="160px">
                  <Text numberOfLines={1} color="coolGray.800" bold>
                    {item.createdBy?.name}
                  </Text>
                  <Text numberOfLines={1} color="coolGray.600">
                    {item.createdBy?.email}
                  </Text>
                </VStack>
                <Spacer />
                <VStack alignSelf="flex-start">
                  <Text fontSize="xs" color="coolGray.800">
                    {item.createdAt
                      ? moment(item.createdAt).format('DD-MM-YYYY HH:mm')
                      : '-'}
                  </Text>
                  <Text
                    fontSize="xs"
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    {ATTENDANCE_APPROVE_STATUS[item.approvedBy ? 1 : 0]}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )
        }}
      </Pressable>
    )
  }

  return (
    <Box flex="1" bgColor="white" paddingX="4">
      {/* <Input
        ref={filterDateRef}
        isDisabled
        backgroundColor="transparent"
        placeholder={t('searchEmployee')}
        width="100%"
        borderRadius="4"
        py="3"
        px="4"
        mt="4"
        fontSize="14"
        onChangeText={onSearch}
        InputRightElement={
          <IconButton
            color="gray.400"
            _icon={{
              as: MaterialIcons,
              name: 'date-range',
            }}
          />
        }
      /> */}
      {isFirstLoad || isSearch || isRefresh ? (
        <Box mt="4" py="4" alignItems="center">
          <Spinner color="primary.500" />
        </Box>
      ) : (
        <FlatList
          mt="4"
          data={list}
          keyExtractor={keyExtractor}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onRefresh}
              color={colors.primary[500]}
              tintColor={colors.primary[500]}
            />
          }
        />
      )}
      <ActionSheet
        isOpen={isOpen}
        onClose={onClose}
        item={selectedItem}
        screenName="AttendanceDetailScreen"
        // deleteMutation={useDeleteProductMutation}
        // deleteFixedCacheKey="delete-product"
        // downloadPdfMutation={useDownloadPdfProductMutation}
        // downloadFixedCacheKey="download-product-pdf"
        // downloadOptions={{
        //   url: `product/pdf/${selectedItem?.id}`,
        //   method: 'POST',
        // }}
        downloadPdf={generatePdfProduct}
        approveMutation={useApproveAttendanceMutation}
        approveFixedCacheKey="approve-attendance"
      />
    </Box>
  )
}

export default AttendanceScreen
