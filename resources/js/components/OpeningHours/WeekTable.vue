<template>
    <table class="openingHours weekTable table w-full">
        <tr>
            <th class="text-left font-bold" :colspan="editable ? 3 : 2">{{ __('Week') }}</th>
        </tr>
        <tr v-for="(intervals, day) in week">
            <td>{{ translateDayName(day) }}</td>
            <td>
                <div v-if="Object.values(intervals).length">
                    <div v-for="(interval, index) in intervals" class="interval">
                        <div v-if="editable">
                            <interval-input
                                :input-value="intervals[index]"
                                @input="intervals[index] = $event"
                                @removeInterval="removeInterval(day, index)"
                            />
                        </div>
                        <div v-else>{{ interval }}</div>
                    </div>
                </div>
                <div v-else>{{ __('Closed') }}</div>
            </td>
            <td v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="addInterval(day)">+</button>
                <button class="btn btn-default btn-danger" v-if="Object.values(intervals).length" @click.prevent="removeAllIntervals(day)">-</button>
            </td>
        </tr>
    </table>
</template>

<script>
import {capitalizeFirstLetter, getRandomTimeInterval} from "../../func";
import {editableProp} from "../../const";
import IntervalInput from "./IntervalInput";

export default {
    components: { IntervalInput },

    props: {
        week: Object,
        editable: editableProp,
    },

    methods: {
        translateDayName(day) {
            return this.__(capitalizeFirstLetter(day))
        },

        addInterval(day) {
            console.log(this.week)
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
