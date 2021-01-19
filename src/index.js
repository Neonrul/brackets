module.exports = (str, bracketsConfig) => {
    const openBrackets = [],
        closingBrackets = [],
        equalBrackets = [],
        flags = {}

    bracketsConfig.forEach(item => {
        if (item[0] === item[1]) {
            equalBrackets.push(item[0])
            flags[item[0]] = false
        } else {
            openBrackets.push(item[0])
            closingBrackets.push(item[1])
        }
    })

    let copyStr = [...str.split('')],

        answer = copyStr.reduce((stec, item, index, arr) => {
            if (openBrackets.includes(item)) {
                stec.push(item)
                return stec
            } else if (closingBrackets.includes(item)) {
                return openBrackets.indexOf(stec.pop()) === closingBrackets.indexOf(item) ? stec : arr.splice(index)
            } else if (equalBrackets.includes(item) && !flags[item]) {
                stec.push(item)
                flags[item] = true
                return stec
            } else {
                flags[item] = false
                return stec.pop() === item ? stec : arr.splice(index)
            }
        }, [])
    return !answer.length
}
