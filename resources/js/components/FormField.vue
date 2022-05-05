<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <week-table :openingHours="openingHours" :editable="true" @addInterval="addInterval"/>
        </template>
    </default-field>
</template>

<script>
import {FormField, HandlesValidationErrors} from 'laravel-nova'
import WeekTable from "./WeekTable"
import {getOpeningHoursData} from "../func";

export default {
    components: {WeekTable},

    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    created() {
        getOpeningHoursData(this.field.value)
    },

    data: function () {
        return {
            ...getOpeningHoursData(this.field.value)
        }
    },

    methods: {
        fill(formData, id) {
            formData.set(
                this.field.attribute,
                JSON.stringify({
                    ...this.openingHours,
                    // exceptions: this.exceptions,
                })
            )
        },

        addInterval(dayName){
            let openingHoursForDay = [...this.openingHours[dayName]] || []
            openingHoursForDay.push(this.field.extraAttributes.placeholder)
            this.openingHours[dayName] = openingHoursForDay
        }
    },
}
</script>
