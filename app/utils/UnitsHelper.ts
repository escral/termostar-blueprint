const unitVSmm = 0.821917808
// const unitVSmm = 2

export const mmToUnits = (mm: number, even = false) => {
    const result = mm * unitVSmm

    if (even) {
        return Math.round(result / 2) * 2
    }

    return result
}

export const unitsToMm = (mm: number, round = false) => {
    const result = mm / unitVSmm

    if (round) {
        return Math.round(result)
    }

    return result
}
