import path from 'path'
import getAbsoluteFilePath from './src/getAbsoluteFilePath.js'
import { parseFileJSON, parseFileYML } from './src/parseFile.js'
import compareObjects from './src/compareObjects.js'

export default (filepath1, filepath2, formater) => {
    const absoluteFilePath1 = getAbsoluteFilePath(filepath1)
    const absoluteFilePath2 = getAbsoluteFilePath(filepath2)
    const extname1 = path.extname(absoluteFilePath1)
    const extname2 = path.extname(absoluteFilePath2)
    let object1
    let object2
    if (extname1 === '.json') {
        object1 = parseFileJSON(absoluteFilePath1)
    } else {
        object1 = parseFileYML(absoluteFilePath1)
    }
    if (extname2 === '.json') {
        object2 = parseFileJSON(absoluteFilePath2)
    } else {
        object2 = parseFileYML(absoluteFilePath2)
    }
    const comparedObjects = compareObjects(object1, object2)

    console.log(comparedObjects)
}
