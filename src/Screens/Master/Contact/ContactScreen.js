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
} from 'native-base'
import { RefreshControl } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'

import { usePagination } from '@/Hooks'
import { ActionSheet } from '@/Components/Organisms'
import {
  useLazyGetContactsQuery,
  useAddContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,
} from '@/Services/modules/contact'

const ContactScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { isOpen, onOpen, onClose } = useDisclose()
  const [
    {
      list,
      onRefresh,
      onSearch,
      onLoadMore,
      keyExtractor,
      renderEmpty,
      renderFooter,
    },
    { isSearch, isRefresh, isFirstLoad },
  ] = usePagination(useLazyGetContactsQuery)

  const [
    deleteTrigger,
    { isSuccess: isSuccessDelete, reset: resetDelete },
  ] = useDeleteContactMutation({
    fixedCacheKey: 'delete-contact',
  })

  const [
    addTrigger,
    { isSuccess: isSuccessAdd, reset: resetAdd },
  ] = useAddContactMutation({
    fixedCacheKey: 'add-contact',
  })

  const [
    editTrigger,
    { isSuccess: isSuccessEdit, reset: resetEdit },
  ] = useEditContactMutation({
    fixedCacheKey: 'edit-contact',
  })

  const [selectedItem, setSelectedItem] = React.useState({})

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => {
            navigation.navigate('MasterContactDetailScreen', {
              type: 'add',
            })
          }}
          key="ghost"
          variant="ghost"
          _icon={{
            as: MaterialIcons,
            name: 'add',
          }}
        />
      ),
    })
  }, [navigation])

  React.useEffect(() => {
    if (isSuccessAdd) {
      onRefresh()
      resetAdd()
    }
  }, [isSuccessAdd])

  React.useEffect(() => {
    if (isSuccessEdit) {
      onRefresh()
      resetEdit()
    }
  }, [isSuccessEdit])

  React.useEffect(() => {
    if (isSuccessDelete) {
      onRefresh()
      resetDelete()
    }
  }, [isSuccessDelete])

  const searchRef = useRef(null)

  const onPressItem = item => {
    searchRef?.current?.blur()
    setSelectedItem(item)
    onOpen()
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => onPressItem(item)}>
        {({ isPressed }) => {
          return (
            <Box
              borderBottomWidth={1}
              borderColor="coolGray.200"
              py="2"
              bg={isPressed ? 'coolGray.200' : 'white'}
            >
              <Text>{item.name}</Text>
            </Box>
          )
        }}
      </Pressable>
    )
  }

  return (
    <Box flex="1" bgColor="white" paddingX="4">
      <Input
        ref={searchRef}
        placeholder={t('searchContact')}
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        mt="4"
        fontSize="14"
        onChangeText={onSearch}
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
        InputRightElement={
          isSearch ? <Spinner color="primary.500" m="2" mr="3" /> : null
        }
      />
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
        screenName="MasterContactDetailScreen"
        deleteMutation={useDeleteContactMutation}
        fixedCacheKey="delete-contact"
      />
    </Box>
  )
}

export default ContactScreen
