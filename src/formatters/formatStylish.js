const formaterStylish = (data) => {
    const str = data.map(
        ({ key, value, depth, status }) =>
            `${' '.repeat(depth * 4 - 2)}${status}${key}: ${value}`
    )
    str.unshift(['{'])
    str.push(`${' '.repeat(data[0].depth * 4 - 4)}}`)
    return str.join('\n')
}
export default formaterStylish
