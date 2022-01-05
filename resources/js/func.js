import {EMPTY_WEEK, WEEK_DAYS} from "./const"

export function getOpeningHoursData(openingHoursData) {
    return {
        openingHours: getOpeningHoursWeekData(openingHoursData),
        exceptions: getOpeningHoursExceptionsData(openingHoursData),
    }
}

export function getOpeningHoursWeekData(openingHoursData) {
    return {
        ...EMPTY_WEEK,
        ..._.pick(openingHoursData, WEEK_DAYS),
    }
}

function getOpeningHoursExceptionsData(openingHoursData) {
    return (openingHoursData && openingHoursData['exceptions']) || []
}

// export function getOpeningHoursWeekData1(openingHoursData) {
//     return _.map(
//         WEEK_DAYS, (day) => {
//             return {
//                 day: openingHoursData[day],
//             }
//
//             return {
//                 day: day,
//                 intervals: openingHoursData[day],
//                 // intervals: _.map(
//                 //     openingHoursData[day],
//                 //     (interval) => {
//                 //         let _interval = interval.toString().split('-')
//                 //         return {
//                 //             from: _interval[0],
//                 //             to: _interval[1],
//                 //         }
//                 //     }),
//                 // intervals: mapIntervals(openingHoursData[day]),
//             }
//         }
//     )
// }
//
// function mapIntervals(intervals) {
//     return _.map(
//         intervals,
//         (interval) => {
//             let _interval = interval.toString().split('-')
//             return {
//                 from: _interval[0],
//                 to: _interval[1],
//             }
//         })
// }

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

// @todo: const or here?
// export function editableProps() {
//     return {
//         editable: {
//             type: Boolean,
//             default: false,
//         }
//     }
// }
