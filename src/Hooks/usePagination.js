import React, { useState, useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { LIMIT_LOAD_DATA } from '@/Data/Constant'
import { Box, Spinner, Text } from 'native-base'
import { useTranslation } from 'react-i18next'

export default function (query, req) {
  const [page, setPage] = useState(0)
  const [list, setList] = useState([])
  const [isRefresh, setRefresh] = useState(false)
  const [isFirstLoad, setFirstLoad] = useState(true)
  const [isLoadMore, setLoadMore] = useState(true)
  const [isSearch, setSearch] = useState(false)

  const { t } = useTranslation()

  const [
    getData,
    {
      data,
      isLoading,
      isSuccess,
      isFetching,
      isUninitialized,
      isError,
      ...queryStateResult
    },
  ] = query({
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: data,
    }),
  })

  useEffect(() => {
    getDataRequest(0, req)
  }, [])

  useEffect(() => {
    if (data?.length < LIMIT_LOAD_DATA) {
      setLoadMore(false)
    }

    if (Array.isArray(data) && data?.length > 0 && isSuccess) {
      // if (links.offset == 0) {
      if (page == 0) {
        setList(data)
        setTimeout(() => {
          setFirstLoad(false)
          setSearch(false)
        }, 200)
      } else {
        setList(tempList => [...tempList, ...data])
      }
    } else if (isSuccess || isError) {
      setTimeout(() => {
        setFirstLoad(false)
        setSearch(false)
      }, 200)
      if ((!data || data.length == 0) && page == 0) {
        setList([])
      }
    }
  }, [data])

  useEffect(() => {
    if (isRefresh && !isFetching) {
      setRefresh(false)
    }
  }, [isFetching])

  const getDataRequest = useCallback(
    (forcePage, otherReq) => {
      const request = {
        ...req,
        ...otherReq,
        params: {
          ...req?.params,
          ...otherReq?.params,
          page: forcePage,
          limit: LIMIT_LOAD_DATA,
        },
      }

      getData(request)
    },
    [req],
  )

  const onRefresh = debounce(
    useCallback(() => {
      setRefresh(true)
      setLoadMore(true)
      setPage(0)
      getDataRequest(0)
    }, [getDataRequest, req]),
    200,
  )

  const onLoadMore = debounce(
    useCallback(() => {
      if (isLoadMore && !isFetching) {
        const newPage = page + 1
        setPage(newPage)
        getDataRequest(newPage, req)
      }
    }, [getDataRequest, page, req, isLoadMore, isFetching]),
    200,
  )

  const onSearch = debounce(
    useCallback(
      keyword => {
        if (!isFetching) {
          setSearch(true)
          setLoadMore(true)
          setPage(0)
          getDataRequest(0, {
            ...req,
            params: {
              ...req?.params,
              keyword,
            },
          })
        }
      },
      [getDataRequest, req, isFetching],
    ),
    500,
  )

  const keyExtractor = useCallback(item => String(item.id), [])

  const renderEmpty = useCallback(() => {
    if (isFetching) return null

    return (
      <Box flex={1} alignItems="center" justifyContent="center" py="5">
        <Text>{t('noData')}</Text>
      </Box>
    )
  }, [isFetching])

  const renderFooter = useCallback(() => {
    if (isLoadMore && isFetching && !isFirstLoad) {
      return (
        <Box py="4">
          <Spinner />
        </Box>
      )
    }
    return null
  }, [isFirstLoad, isFetching, isLoadMore])

  return [
    {
      list,
      onRefresh,
      onLoadMore,
      onSearch,
      keyExtractor,
      renderEmpty,
      renderFooter,
    },
    {
      isLoading,
      isSuccess,
      isFetching,
      isFirstLoad,
      isUninitialized,
      isRefresh,
      isError,
      isSearch,
      ...queryStateResult,
    },
  ]
}
