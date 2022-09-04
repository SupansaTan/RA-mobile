export class LawContentModel {
    lawId: string;
    title: string
    locationName: string;
    actType: string
    legislationType: string
    legislationUnit: string
    catagory: string
    announceDate: Date;
    enforceDate: Date;
    cancelDate: Date;
    pdfUrl: string;
}

export class LawListModel {
    totalLaw: number;
    lawList : Array<LawListDetail>;
}

export class LawListDetail {
    lawId: string;
    title: string;
    legislationType: string;
}