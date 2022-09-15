export const NotifyIcon = {
  relevant: {
    bgColor: '#FFFADE',
    iconColor: '#FFC700',
    iconName: 'text-box-search-outline',
    iconComponent: 'MaterialCommunity'
  },
  consistance: {
    bgColor: '#FFEEDE',
    iconColor: '#FF9C40',
    iconName: 'text-box-search-outline',
    iconComponent: 'MaterialCommunity'
  },
  approve: {
    bgColor: '#DEF4EC',
    iconColor: '#13AF82',
    iconName: 'check',
    iconComponent: 'SimpleLine'
  }
}

export const getIconBgColor = (notiType: string) => {
  switch(notiType) {
    case 'relevant':
      return NotifyIcon.relevant.bgColor
    case 'consistance':
      return NotifyIcon.consistance.bgColor
    case 'approve':
      return NotifyIcon.approve.bgColor
  }
  return NotifyIcon.relevant.bgColor
}

export const getIconColor = (notiType: string) => {
  switch(notiType) {
    case 'relevant':
      return NotifyIcon.relevant.iconColor
    case 'consistance':
      return NotifyIcon.consistance.iconColor
    case 'approve':
      return NotifyIcon.approve.iconColor
  }
  return NotifyIcon.relevant.iconColor;
}