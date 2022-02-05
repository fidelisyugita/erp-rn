import React from 'react'
import { Center, Modal, Spinner } from 'native-base'

const Loading = (props, ref) => {
  const [isLoading, setLoading] = React.useState(false)

  React.useImperativeHandle(ref, () => ({
    show: () => {
      setLoading(true)
    },
    hide: () => {
      setLoading(false)
    },
  }))

  return (
    <Modal
      isOpen={isLoading}
      // onClose={() => setLoading(false)}
      closeOnOverlayClick={false}
      _backdrop={{
        bg: 'gray.900',
      }}
    >
      <Center>
        <Spinner size="lg" />
      </Center>
    </Modal>
  )
}

export default React.memo(React.forwardRef(Loading))
