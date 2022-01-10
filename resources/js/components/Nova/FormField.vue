<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <week-table :week="week" :editable="true"/>
            <exceptions-table v-if="field.allowExceptions" :exceptions="exceptions" :editable="true"/>
        </template>
    </default-field>
</template>

<script>
import {FormField, HandlesValidationErrors} from 'laravel-nova'
import WeekTable from "../OpeningHours/WeekTable";
import ExceptionsTable from "../OpeningHours/ExceptionsTable";
import {getFieldData} from "../../func";

export default {
    components: {WeekTable, ExceptionsTable},

    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    data: function () {
        return {
            ...getFieldData(this.field.value),
        }
    },

    methods: {
        fill(formData) {
            formData.set(
                this.field.attribute,
                JSON.stringify({
                    ...this.week,
                    exceptions: this.exceptions,
                })
            )
        },
    },
}
</script>
