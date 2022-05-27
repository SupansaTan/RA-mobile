const today = new Date()
const yesterday = new Date(today.getDate() - 1)
const beforeYesterday = new Date(today.getDate() - 2)

export const NotifyList = [
  {
    date: 'วันนี้',
    data: [
      {
        title: 'การประเมินความสอดคล้อง',
        content: 'พ.ร.บ.พลังงานนิวเคลียร์',
        time: '13.00 น.'
      },
      {
        title: 'ผู้บริหารอนุมัติ',
        content: 'พ.ร.บ.พลังงานนิวเคลียร์',
        time: '13.00 น.'
      },
    ]
  },
  {
    date: '2 มี.ค. 2565',
    data: [
      {
        title: 'การประเมินความสอดคล้อง',
        content: 'พ.ร.บ.ความปลอดภัย 2554',
        time: '13.00 น.'
      },
      {
        title: 'ผู้บริหารอนุมัติ',
        content: 'พ.ร.บ.ความปลอดภัย 2554',
        time: '13.00 น.'
      }
    ]
  },
  {
    date: '1 มี.ค. 2565',
    data: [
      {
        title: 'การประเมินความเกี่ยวข้อง',
        content: 'พ.ร.บ.ความปลอดภัย 2554',
        time: '13.00 น.'
      }
    ]
  }
]