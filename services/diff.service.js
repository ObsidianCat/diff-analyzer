function compareInputs({left, right}) {
    const result = {
        isEqual: true,
        isDifferentInSize: false,
        diffs: [],
    };

    if( left.length != right.length){
        result.isEqual = false;
        result.isDifferentInSize = true;
    } else{
        let diffInProcss = false;
        for(let i = 0; i< left.length; i++){
            if(left[i] !== right[i] && diffInProcss == false){
                result.diffs.push({ start: i, end: left.length -1});
                diffInProcss = true;
            } else if(left[i] === right[i] && diffInProcss == true){
                diffInProcss = false;
                let lastDifferenceArr = result.diffs[result.diffs.length -1];
                //previous char was the last difference in this griup
                lastDifferenceArr.end = i-1;
                diffInProcss = false;
            }
        }
        result.isEqual = result.diffs.length > 0? false: true;
    }

    return result;
}

module.exports = {
    compareInputs,
};