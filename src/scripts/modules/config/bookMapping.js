const bookMapping = (noMenu, panelType) => {

    if (noMenu) {
        switch(panelType) {
            case "bookAppraisal": 
                return "doc";
            case "bookHistory": 
                return "doc";
            case "bookApproval": 
                return "doc";
            case "caseAttachment": 
                return "pdf";
            case "bookAttachment": 
                return "doc";
            case "attachment": 
                return "pdf";
            case "1": 
                return "pdf";
            case "2": 
                return "pdf";
            case "3": 
                return "pdf";
            case "4": 
                return "picture";
            case "5": 
                return "picture";
            case "6": 
                return "picture";
            case "7": 
                return "picture";
        }
    } else {
        switch(panelType) {
            case "bookAppraisal": 
                return "pdf";
            case "bookHistory": 
                return "pdf";
            case "bookApproval": 
                return "pdf";
            case "caseAttachment": 
                return "pdf";
            case "bookAttachment": 
                return "pdf";
            case "attachment": 
                return "pdf";
            case "1": 
                return "pdf";
            case "2": 
                return "pdf";
            case "3": 
                return "pdf";
            case "4": 
                return "picture";
            case "5": 
                return "picture";
            case "6": 
                return "picture";
            case "7": 
                return "picture";
        }
    }
   
};

export default bookMapping;
