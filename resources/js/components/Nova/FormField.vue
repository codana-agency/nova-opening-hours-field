<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <week-table :opening-hours="openingHours" :editable="true"/>
            <exceptions-table v-if="field.allowExceptions" :exceptions="exceptions" :editable="true"/>
        </template>
    </default-field>
</template>

<script>
import {FormField, HandlesValidationErrors} from 'laravel-nova'
import WeekTable from "../OpeningHours/WeekTable"
import ExceptionsTable from "../OpeningHours/ExceptionsTable"
import {getOpeningHoursData} from "../../func"

export default {
    components: {WeekTable, ExceptionsTable},

    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    data: function () {
        return {
            ...getOpeningHoursData(this.field.value),
        }
    },

    methods: {
        fill(formData) {
            formData.set(
                this.field.attribute,
                JSON.stringify({
                    ...this.openingHours,
                    exceptions: this.exceptions,
                })
            )
        },
    },
}
</script>
