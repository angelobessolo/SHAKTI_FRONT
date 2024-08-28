export interface Documents {
    title:      string;
    documents:  File[];  
    status:     boolean;
    disabled:   boolean;
}

export interface RequiredResponsibleDocumentsMain{
    statusDocumentation:          string;
    RequiredResponsibleDocuments: RequiredResponsibleDocuments[];
}


export interface RequiredResponsibleDocuments{
    title:              string;
    required:           boolean;
    status:             boolean;
    disabled:           boolean;
    uploadFile:         boolean; 
    type:               number;
    pendingDocuments?:   File;
    documents:          Documents1[];  
}

export interface Documents1 {
    id?:                 string;
    documentNumber?:     number;
    documentType?:       number;
    documentName?:       string;
    documentNamePath?:   string;
    documentPath?:       string;
    documentSize?:       string;
    documentExtention?:  string;
    documentCreateId?:   string;
    documentUpdateDate?: string;
    documentUpdateHour?: string;
    documentCreateDate?: string;
    documentCreateHour?: string;
}