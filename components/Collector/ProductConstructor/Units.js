export const mmToUnits = (mm, even = false) => {
    const result = +mm * 0.821917808

    if (even) {
        return Math.round(result / 2) * 2
    }

    return result

    return Math.round(result)
}

export const unitsToMm = (mm, round = false) => {
    const result = +mm / 0.821917808

    if (round) {
        return Math.round(result)
    }

    return result
}
