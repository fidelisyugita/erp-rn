import React, { useEffect, useState } from 'react'
import DateRangePicker from 'rn-select-date-range'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from 'native-base'

const DateRange = ({ isOpen, onClose, setRange, selectedRange }) => {
  const { t } = useTranslation()
  const [dateRange, setDateRange] = useState({})

  const apply = () => {
    setRange(dateRange)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.Header>{t('selectDate')}</Modal.Header>
        <Modal.Body>
          <DateRangePicker
            onSelectDateRange={setDateRange}
            // blockSingleDateSelection={true}
            responseFormat="YYYY-MM-DD"
            maxDate={moment()}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="unstyled" mr="1" onPress={onClose}>
            {t('cancel')}
          </Button>
          <Button
            colorScheme="primary"
            isDisabled={!dateRange.firstDate || !dateRange.secondDate}
            onPress={apply}
          >
            {t('apply')}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
export default DateRange
