<template>
    <table class="openingHours exceptionsTable table mt-6 w-full">
        <tr>
            <th class="text-left font-bold" colspan="2">{{ __('Exceptions') }}</th>
            <th v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="addException">+</button>
            </th>
        </tr>
        <tr v-for="(intervals, date) in exceptions">
            <td>
                <div v-if="editable">
                    <input
                        type="date"
                        class="form-control form-input form-input-bordered"
                        :value="date"
                        :min="new Date().toISOString().slice(0, 10)"
                        @change="changeExceptionName"
                        required
                    >
                </div>
                <div v-else>{{ date }}</div>
            </td>
            <td>
                <div v-if="Object.values(intervals).length">
                    <div v-for="(interval, index) in intervals" class="interval">
                        <div v-if="editable">
                            <interval-input
                                :input-value="interval"
                                @input="exceptions[date][index] = $event"
                                @removeInterval="removeInterval(date, index)"
                            />
                        </div>
                        <div v-else>{{ interval }}</div>
                    </div>
                </div>
                <div v-else>{{ __('Closed') }}</div>
            </td>
            <td v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="addInterval(date)">+</button>
                <button class="btn btn-default btn-danger" @click.prevent="removeException(date)">-</button>
            </td>
        </tr>
    </table>
</template>

<script>
import {editableProp} from "../../const"
import {getRandomDate, getRandomTimeInterval} from "../../func"
import IntervalInput from "./IntervalInput";

export default {
    components: { IntervalInput },

    props: {
        exceptions: Object,
        editable: editableProp,
    },

    methods: {
        addException() {
            this.$set(this.exceptions, getRandomDate(), [getRandomTimeInterval()])
        },

        removeException(date) {
            this.$delete(this.exceptions, date)
        },

        changeExceptionName(event) {
            let exception = this.exceptions[event.target._value]

            this.$delete(this.exceptions, event.target._value)
            this.$set(this.exceptions, event.target.value, exception)
        },

        addInterval(date) {
            let intervals = this.exceptions[date] || []
            intervals.push(getRandomTimeInterval())

            this.exceptions[date] = intervals
        },

        removeInterval(date, index) {
            this.exceptions[date].splice(index, 1)
        },
    },
}
</script>
