
const emptyValidator = (obj, mainKey = '') =>{
    let errors = {};
    const message = 'Cannot be empty';
    let entries = null;
    if(mainKey === ''){
        entries = Object.entries(obj);
    }else{
        entries = Object.entries(obj[mainKey]);
    }
    for(let array of entries){
        const [key, value] = array;
        const type = typeof value;

        switch(type){
            case 'string':
                if(value === ''){
                    errors[key] = message;
                }
                break;
            default:
                continue;
        }
    }

    return errors;
}

exports.emptyValidator = emptyValidator;