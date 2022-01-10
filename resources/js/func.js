import {EMPTY_WEEK} from "./const";

export function getFieldData(openingHoursData) {
    return {
        week: getWeekData(openingHoursData),
        exceptions: getExceptionsData(openingHoursData),
    }
}

export function getWeekData(openingHoursData) {
    return {
        ...EMPTY_WEEK,
        ..._.pick(openingHoursData, Object.keys(EMPTY_WEEK)),
    }
}

function getExceptionsData(openingHoursData) {
    return openingHoursData && openingHoursData['exceptions']
        ? Object.keys(openingHoursData['exceptions']).length ? openingHoursData['exceptions'] : {}
        : {}
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
}

export function getRandomDate() {
    let date = new Date()
    date.setDate(date.getDate() + Math.floor(Math.random() * 365))

    return date.toISOString().split('T')[0]
}

export function getRandomTimeInterval() {
    let fromHour = Math.floor(Math.random() * 24)
    let toHour = fromHour + 1 + Math.floor(Math.random() * (24 - fromHour))

    let padZeroFn = _hour => _hour.toString().padStart(2, '0')

    return padZeroFn(fromHour) + ':00-' + padZeroFn(toHour) + ':00'
}
