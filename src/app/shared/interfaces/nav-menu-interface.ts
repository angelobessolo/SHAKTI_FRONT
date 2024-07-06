export interface NavMenu {
    label?: string;
    menu: Items[];
}

export interface Items {
    title?: string;
    name: string;
    icon?: string;
    children?: Items[];
    url?: string;
    isExpanded?: boolean; // Expandir sub menu
}



export interface UserParams {
    moduleName: string;
    moduleIcon?: string;
    moduleDescription?: string;
    moduleRoute?: string;
    isExpanded: boolean;
    submodules?: SubmoduleResponse[];
}
  
export interface SubmoduleResponse {
    submoduleName: string;
    submoduleIcon?: string;
    submoduleDescription?: string;
    submoduleRoute?: string;
    submoduleItems?: string[];
}

