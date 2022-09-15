export const ReportDetail = {
    location: 'โครงการร้อยเพชร',
    totalTask: 30,
    inprogressTask: 20,
    completeTask: 10,
    reletedLaw: 22,
    NonreletedLaw: 10,
    consistLaw: 10,
    NonconsistLaw: 0,
    StatusTask:[
        {
            status: 'ประเมินความเกี่ยวข้อง',
            total:3
        },
        {
            status: 'รออนุมัติความเกี่ยวข้อง',
            total:5
        },
        {
            status: 'ประเมินความสอดคล้อง',
            total:4
        },
        {
            status: 'รออนุมัติความสอดคล้อง',
            total:2
        },
        {
            status: 'กฎหมายที่ยังไม่สอดคล้อง',
            total:6
        },
        {
            status: 'ปิดงาน',
            total:10
        },
    ]

}

export const TaskList = [
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
        },
        {
            title: 'พ.ร.บ.คลังสินค้า',
            datetime: '4 พ.ค. 2565 15.00 น.',
            timestatus: 1,
        }
      ]
    },
]

export const TaskDetail = {   
    title: 'พ.ร.บ.ความปลอดภัย 2554',
    lawdetail: 'กฎกระทรวงกำหนดมาตรฐานในการบริหาร จัดการและดำเนินการด้านความปลอดภัยอาชีวอนามัยและสภาพแวดล้อมในการทำงานเกี่ยวกับไฟฟ้า พ.ศ. ๒๕๕๘',
    location: 'โครงการร้อยเพชร',
    progress: [
        {
            type: 'relevant',
            person: 'นาย A',
            datetime: '5 เมษายน 2565 13.11',
            accept: 9,
            reject: 1,
        },
        {
            type: 'relevantapprove',
            person: 'นาย B',
            datetime: '5 เมษายน 2565 13.11',
        },
        {
            type: 'consistance',
            person: 'นาย C',
            datetime: '5 เมษายน 2565 13.11',
            accept: 8,
            reject: 1,
        },
        {
            type: 'consistanceapprove',
            person: 'นาย D',
            datetime: '5 เมษายน 2565 13.11',
        },
        {
            type: 'followup',
            person: 'นาย E',
            datetime: '5 เมษายน 2565 13.11',
        },
        {
            type: 'complete',
        },
    ]
        
    

}