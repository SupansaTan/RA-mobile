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

export const TaskRelativeAssessment = {
  location: 'โรงงานร้อยเพชร',
  title: 'พ.ร.บ.พลังงานนิวเคลียร์',
  type: 'relavant',
  keyact: [
  {
    order: 1,
    keyreq: 'This is key req 1',
    standard: 'This is standard 1',
    frequency: 'This is frequency 1',
    practice:'This is practice 1',
    related: true,
    comment: 'This is comment 1',
  },
  {
    order: 2,
    keyreq: 'This is key req 2',
    standard: 'This is standard 2',
    frequency: 'This is frequency 2',
    practice:'This is practice 2',
    related: false,
    comment: 'This is comment 2',
  },
  {
    order: 3,
    keyreq: 'This is key req 3',
    standard: 'This is standard 3',
    frequency: 'This is frequency 3',
    practice:'This is practice 3',
    related: true,
    comment: '',
  },
  {
    order: 4,
    keyreq: 'This is key req 4',
    standard: 'This is standard 4',
    frequency: 'This is frequency 4',
    practice:'This is practice 4',
    related: false,
    comment: '',
  },
]
}

export const TaskConsistanceAssessment = {
  location: 'โรงงานร้อยเพชร',
  title: 'พ.ร.บ.ข้อมูลส่วนบุคคล',
  type: 'consistance',
  keyact: [
  {
    order: 1,
    keyreq: 'This is key req 1',
    standard: 'This is standard 1',
    frequency: 'This is frequency 1',
    practice:'This is practice 1',
    consistance: false,
    comment: 'This is comment 1',
  },
  {
    order: 2,
    keyreq: 'This is key req 2',
    standard: 'This is standard 2',
    frequency: 'This is frequency 2',
    practice:'This is practice 2',
    consistance: true,
    comment: 'This is comment 2',
  },
  {
    order: 3,
    keyreq: 'This is key req 3',
    standard: 'This is standard 3',
    frequency: 'This is frequency 3',
    practice:'This is practice 3',
    consistance: false,
    comment: '',
  },
  {
    order: 4,
    keyreq: 'This is key req 4',
    standard: 'This is standard 4',
    frequency: 'This is frequency 4',
    practice:'This is practice 4',
    consistance: true,
    comment: '',
  },
]
}