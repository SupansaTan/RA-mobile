export const TaskData = [
  {
    type: 'relevant',
    task: [
      {
        title: 'พ.ร.บ.พลังงานนิวเคลียร์',
        datetime: 'วันนี้ 13.00 น.',
        timestatus: 2,
      },
      {
        title: 'พ.ร.บ.ความปลอดภัย',
        datetime: '2 พ.ค. 2565 15.00 น.',
        timestatus: 1,
      }
    ]
  },
  {
    type: 'consistance',
    task: [
      {
        title: 'พ.ร.บ.ข้อมูลส่วนบุคคล',
        datetime: 'เมื่อวาน 15.00 น.',
        timestatus: 3,
      }
    ]
  },
  {
    type: 'approve',
    task: [
      {
        title: 'พ.ร.บ.การใช้เครื่องจักร',
        datetime: '31 มี.ค. 2565 15.00 น.',
        timestatus: 1,
      }
    ]
  }
]

export const IncomingTask = [
  {
    title: 'พ.ร.บ.ข้อมูลส่วนบุคคล',
    datetime: 'เมื่อวาน 15.00 น.',
    timestatus: 3,
    location:'โรงงานร้อยเพชร',
  },
  {
    title: 'พ.ร.บ.พลังงานนิวเคลียร์',
    datetime: '1 พ.ค. 2565 15.00 น.',
    timestatus: 2,
    location:'โรงงานร้อยเพชร',
  },
  {
    title: 'พ.ร.บ.ความปลอดภัย',
    datetime: '1 พ.ค. 2565 15.00 น.',
    timestatus: 2,
    location:'โรงงานผลิตอาหารสัตว์บกปักธงชัย',
  },
]

export const TaskRelativeAssessment = [
  {
    order: 1,
    keyreq: 'A1',
    standard: 'B1',
    frequency: 'C1',
    practice:'D1',
    Related: false,
  },
  {
    order: 2,
    keyreq: 'A2',
    standard: 'B2',
    frequency: 'C2',
    practice:'D2',
    Related: false,
  },
  {
    order: 3,
    keyreq: 'A3',
    standard: 'B3',
    frequency: 'C3',
    practice:'D3',
    Related: false,
  },
]