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

export const TrackTask = {
    location: 'โครงการร้อยเพชร',
    successful: [
        {
            title: 'พ.ร.บ.กองทุนน้ำมัน',
            datetime: 'วันนี้ 13:00',
            timestatus: 2,
            assign: 'ฟ้า ทลายโจร',
        },
        {
            title: 'พ.ร.บ.การคลัง',
            datetime: '02/05/2022 15:00',
            timestatus: 1,
            assign: 'ภูวดล ชอบนอนหงาย',
        },
    ],
    inprogress: [
        {
            title: 'พ.ร.บ.เงินเดือน',
            datetime: '01/05/2022 16:00',
            timestatus: 1,
            assign: 'ผักบุ้ง ไฟแดง',
        },
    ],
}
