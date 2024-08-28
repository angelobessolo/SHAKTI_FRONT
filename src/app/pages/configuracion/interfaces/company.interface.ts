export interface Company {
    _id?:                                 string;
    companyName:                          string;  
    companyDocumentType:                  string;
    companyDocumentNumber:                number;
    companyCity:                          string;
    companyAddress:                       string;
    companyPhoneNumber?:                  number;
    companyEmail:                         string;
    companyIndustry:                      string;
    companyWebsite:                       string;
    companyRepresentativeName:            string;
    companyRepresentativeTypeDocument:    string;  
    companyRepresentativeDocumentNumber:  number; 
    companyRepresentativeEmail:           string; 
    companyRepresentativePhoneNumber?:    number;
}