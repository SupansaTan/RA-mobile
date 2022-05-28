export const NotifyList = [
  {
    date: 'วันนี้',
    data: [
      {
        type: 'consistance',
        title: 'การประเมินความสอดคล้อง',
        content: 'พ.ร.บ.พลังงานนิวเคลียร์',
        time: '13.00',
        readStatus: false
      },
      {
        type: 'approve',
        title: 'ผู้บริหารอนุมัติ',
        content: 'พ.ร.บ.พลังงานนิวเคลียร์',
        time: '13.00',
        readStatus: false
      },
    ]
  },
  {
    date: '2 มี.ค. 2565',
    data: [
      {
        type: 'consistance',
        title: 'การประเมินความสอดคล้อง',
        content: 'พ.ร.บ.ความปลอดภัย 2554',
        time: '09.00',
        readStatus: false
      },
      {
        type: 'approve',
        title: 'ผู้บริหารอนุมัติ',
        content: 'พ.ร.บ.ความปลอดภัย 2554',
        time: '13.00',
        readStatus: true
      }
    ]
  },
  {
    date: '1 มี.ค. 2565',
    data: [
      {
        type: 'relevant',
        title: 'การประเมินความเกี่ยวข้อง',
        content: 'พ.ร.บ.ความปลอดภัย 2554',
        time: '13.00',
        readStatus: true
      }
    ]
  }
]

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
}