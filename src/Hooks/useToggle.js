import React, { useCallback, useState } from 'react'

export default function (defaultValue = false) {
  const [isShow, setShow] = useState(defaultValue)

  const toggle = useCallback(() => {
    setShow(s => !s)
  }, [])

  return [isShow, toggle]
}
