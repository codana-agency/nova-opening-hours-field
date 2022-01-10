<template>
    <table class="openingHours weekTable table w-full">
        <tr>
            <th class="text-left font-bold" :colspan="editable ? 3 : 2">{{ __('Week') }}</th>
        </tr>
        <tr v-for="(intervals, day) in week">
            <td>{{ translateDayName(day) }}</td>
            <td>
                <div v-if="intervals.length">
                    <div v-for="(interval, index) in intervals" class="interval">
                        <div v-if="editable">
                            <input class="form-control form-input form-input-bordered"
                                   v-model="intervals[index]"
                                   pattern="(([0-1][0-9]|2[0-3]):[0-5][0-9])-(([0-1][0-9]|2[0-3]):([0-5][0-9])|24:00)"
                                   required
                            >
                            <button class="btn btn-default btn-danger" @click.prevent="removeInterval(day, index)">-</button>
                        </div>
                        <div v-else>{{ interval }}</div>
                    </div>
                </div>
                <div v-else>{{ __('Closed') }}</div>
            </td>
            <td v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="addInterval(day)">+</button>
                <button class="btn btn-default btn-danger" v-if="intervals.length" @click.prevent="removeAllIntervals(day)">-</button>
            </td>
        </tr>
    </table>
</template>

<script>
import {capitalizeFirstLetter, getRandomTimeInterval} from "../../func";
import {editableProp} from "../../const";

export default {
    props: {
        week: Object,
        editable: editableProp,
    },

    methods: {
        translateDayName(day) {
            return this.__(capitalizeFirstLetter(day))
        },

        addInterval(day) {
            let openingHoursForDay = this.week[day] || []
            openingHoursForDay.push(getRandomTimeInterval())

            this.week[day] = openingHoursForDay
        },

        removeAllIntervals(day) {
            this.week[day] = []
        },

        removeInterval(day, index) {
            this.week[day].splice(index, 1)
        },
    }
}
</script>
