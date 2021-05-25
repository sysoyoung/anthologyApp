
function parceObj(resp){
    let vars = resp.head.vars;
    let results = resp.results.bindings[0];
    if(!results) return false;

    let unsw = {};
    for(let i = 0; i < vars.length; i++)
        unsw[vars[i]] = results[vars[i]]?.value;
    
    return unsw;
}

function parseArray(resp){
    let vars = resp.head.vars;
    let results = resp.results.bindings;

    if(results.length == 0) return false;

    let unsw = [];
    for(let j = 0; j < results.length; j++){
        let temp = results[j];
        let tempObj = {};
        for(let i = 0; i < vars.length; i++)
            tempObj[vars[i]] = temp[vars[i]]?.value;
        unsw.push(tempObj);
    }
    
    return unsw;
}

module.exports.parseArray = parseArray;
module.exports.parceObj = parceObj;
