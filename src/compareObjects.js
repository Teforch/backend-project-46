import _ from 'lodash'
import formater from './formatters/formatStylish.js'

const compareObjects = (
    obj1,
    obj2,
    formatStyling = 'stylish',
    depth = 1,
    status = undefined
) => {
    const keysObj1 = Object.keys(obj1)
    const keysObj2 = Object.keys(obj2)
    const connectedKeys = _.uniq(keysObj1.concat(keysObj2).sort())

    const arrForFormater = connectedKeys.flatMap((key) => {
        const childrenObj1 = _.cloneDeep(obj1[key])
        const childrenObj2 = _.cloneDeep(obj2[key])
        if (
            typeof obj1[key] === 'object' &&
            typeof obj2[key] === 'object' &&
            obj1[key] !== null
        ) {
            // { key, value: value, acc, status }
            return {
                key,
                value: compareObjects(
                    childrenObj1,
                    childrenObj2,
                    formatStyling,
                    depth + 1
                ),
                depth,
                status: status !== undefined ? status : '  ',
            }
        }
        if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            const obj1 = {
                key,
                value: compareObjects(
                    {},
                    childrenObj1,
                    formatStyling,
                    depth + 1,
                    '  '
                ),
                depth,
                status: status !== undefined ? status : '- ',
            }
            if (keysObj2.includes(key) && typeof obj2[key] !== 'object') {
                return [
                    obj1,
                    {
                        key,
                        value: obj2[key],
                        depth,
                        status: status !== undefined ? status : '+ ',
                    },
                ]
            }
            return obj1
        }
        if (typeof obj2[key] === 'object' && obj2[key] !== null) {
            return {
                key,
                value: compareObjects(
                    childrenObj2,
                    {},
                    formatStyling,
                    depth + 1,
                    '  '
                ),
                depth,
                status: status !== undefined ? status : '+ ',
            }
        }
        if (keysObj2.includes(key) && keysObj1.includes(key)) {
            if (obj1[key] === obj2[key]) {
                return {
                    key,
                    value: obj1[key],
                    depth,
                    status: status !== undefined ? status : '  ',
                }
            }
            return [
                {
                    key,
                    value: obj1[key],
                    depth,
                    status: status !== undefined ? status : '- ',
                },
                {
                    key,
                    value: obj2[key],
                    depth,
                    status: status !== undefined ? status : '+ ',
                },
            ]
        }
        if (keysObj1.includes(key)) {
            return {
                key,
                value: obj1[key],
                depth,
                status: status !== undefined ? status : '- ',
            }
        }
        return {
            key,
            value: obj2[key],
            depth,
            status: status !== undefined ? status : '+ ',
        }
    })
    const result = formater(arrForFormater)
    return result
}
export default compareObjects
