export const createPipeCapPath = (
    width: number,
    height: number,
    rounded: boolean,
    offset = 0,
) => {
    if (!rounded) {
        return createSquareCapPath(width, height, offset)
    }

    return createRoundCapPath(width, height, offset)
}

export const createPipeOuterRectPath = (width: number, height: number) => {
    return `M0,0 H${width} V${height} H0 Z`
}

const createRoundCapPath = (width: number, height: number, offset = 0) => {
    const radius = getBorderRadius(width - offset * 2)

    return `M${offset},${offset + radius}
 Q ${offset},${offset} ${offset + radius},${offset}
 H ${width - offset - radius}
 Q ${width - offset},${offset} ${width - offset},${offset + radius}
 V ${height - offset - radius}
 Q ${width - offset},${height - offset} ${width - offset - radius},${height - offset}
 H ${offset + radius}
 Q ${offset},${height - offset} ${offset},${height - offset - radius}
 Z`
}

const createSquareCapPath = (width: number, height: number, offset = 0) => {
    return `M${offset},${offset} H${width - offset} V${height - offset} H${offset} Z`
}

const getBorderRadius = (width: number) => {
    return Math.round((width / 2.3) / 2) * 2
}
