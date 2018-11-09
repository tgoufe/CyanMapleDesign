// 判断字符串中的括号是否匹配
export default isBalanced = (str) => {
    const map = new Map([
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ])

    let stack = [];

    for(let i = 0 ; i < str.length; ++i){
        let node = str[i]

        if (map.has(node)){
            stack.push(node)
        }
        else if ([...map.values()].includes(node)){
            if (stack[stack.length - 1] !==
                                [...map.entries()].filter(el=>el[1]===node).pop().shift()
                         ){
                return false
            }
            stack.splice(stack.length-1, 1)
        }
    }

    return stack.length === 0
}