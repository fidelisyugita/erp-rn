import React, { useCallback, useState } from 'react'
import { MENU } from '@/Data/Constant'
import { useSession } from '.'
import { getCurrentRoute } from '@/Navigators/utils'

const matchAccess = (roleAccess = [], userRole, access) => {
  return roleAccess.some(ra => {
    return (
      userRole.some(ur => ur.includes(ra.role)) && ra.access.includes(access)
    )
  })
}

export default function (screenName = getCurrentRoute().name) {
  const { userRole } = useSession()
  const [menu, setMenu] = useState([])

  React.useEffect(() => {
    const index = MENU.findIndex(m => {
      if (m.name == screenName) {
        return true
      } else if (m.menu) {
        if (m.menu.find(mm => mm.name == screenName)) {
          return true
        }
      }
      return false
    })

    if (index > -1) {
      if (MENU[index].name == screenName) {
        setMenu(MENU[index])
      } else {
        const tempMenu = MENU[index].menu.find(mi => mi.name == screenName)
        setMenu(tempMenu || [])
      }
    }
  }, [])

  return {
    isCanAdd: matchAccess(menu?.roleAccess, userRole, 'create'),
    isCanView: matchAccess(menu?.roleAccess, userRole, 'read'),
    isCanEdit: matchAccess(menu?.roleAccess, userRole, 'update'),
    isCanDelete: matchAccess(menu?.roleAccess, userRole, 'delete'),
    isCanDownload: matchAccess(menu?.roleAccess, userRole, 'download'),
  }
}
