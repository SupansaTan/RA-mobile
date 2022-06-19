export const TrackLocationList = [
    {
        location: 'โครงการร้อยเพชร',
        successful: 2,
        inprogress: 1,
    },
    {
        location: 'โรงงานผลิตอาหารสัตว์ปักธงชัย',
        successful: 1,
        inprogress: 2, 
    },
]

export const TrackTaskList = [
    {
        location: 'โครงการร้อยเพชร',
        successful: [
            {
                title: 'พ.ร.บ.กองทุนน้ำมัน',
                datetime: 'วันนี้ 13.00 น.',
                timestatus: 'today',
                assign: 'ฟ้า ทลายโจร',
            },
            {
                title: 'พ.ร.บ.การคลัง',
                datetime: '2 พ.ค. 2565 15.00 น.',
                timestatus: 'remain',
                assign: 'ภูวดล ชอบนอนหงาย',
            },
        ],
        inprogress: [
            {
                title: 'พ.ร.บ.เงินเดือน',
                datetime: '1 พ.ค. 2565 16.00 น.',
                timestatus: 'remain',
                assign: 'ผักบุ้ง ไฟแดง',
            },
        ],
    },
    {
        location: 'โรงงานผลิตอาหารสัตว์ปักธงชัย',
        successful: [
            {
                title: 'พ.ร.บ.จดทะเบียนเครื่องจักร',
                datetime: 'วันนี้ 15.00 น.',
                timestatus: 'today',
                assign: 'ฟ้า ทลายโจร',
            },
        ],
        inprogress: [
            {
                title: 'พ.ร.บ.เชื้อโรคจากพิษและสัตว์',
                datetime: '1 พ.ค. 2565 16.00 น.',
                timestatus: 'remain',
                assign: 'ผักบุ้ง ไฟแดง',
            },
            {
                title: 'พ.ร.บ.การคลัง',
                datetime: '2 พ.ค. 2565 15.00 น.',
                timestatus: 'remain',
                assign: 'ภูวดล ชอบนอนหงาย',
            },
        ],
    },
]