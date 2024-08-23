export interface TableHeader {
    label: string;
    span: number;
}

export interface TableRow {
    id: number;
    value: string[];
}

export interface TableClickable {
    id: number;
    index: number;
    dataContent: string;
}

export interface TableData {
    tableName: string;
    headers: TableHeader[][];
    rows: TableRow[];
    footers?: string;
    clickable?: TableClickable[];
}

export interface StructureInformation {
    visualData: {
        dataContent: string;
    };
    genericData: {
        structureId: string;
        structureName: string;
    };
    tableData: TableData[];
}

export interface StructureInfo {
    [key: string]: StructureInformation;
}

export interface ResultResponse {
    // TODO: add job information and corresponding interface
    'structure information': StructureInfo;
}
