export interface Responsible {
    _id?:                             string;
    responsibleDocumentType:          string;  
    responsibleDocumentNumber:        string;
    responsibleExpeditionDate:        Date;
    responsibleName:                  string;
    responsibleLicenseNumber:         number;
    responsibleLicenseExpireDate:     Date;
    responsibleExpeditionCity:     string;
    responsibleStatus:                string;
    responsibleCreateId:              string;  
    responsibleCreatedAt:             Date; 
    responsibleUpdatedAt?:            Date; 
}