<template>
    <panel-item :field="field">
        <template slot="value">
            <week-table :opening-hours="openingHours"/>
            <exceptions-table v-if="field.allowExceptions" :exceptions="exceptions"/>
        </template>
    </panel-item>
</template>

<script>
import WeekTable from "../OpeningHours/WeekTable";
import ExceptionsTable from "../OpeningHours/ExceptionsTable";
import {getOpeningHoursData} from "../../func";

export default {
    components: {WeekTable, ExceptionsTable},

    props: ['resource', 'resourceName', 'resourceId', 'field'],

    data: function () {
        return {
            ...getOpeningHoursData(this.field.value)
        }
    },
}
</script>
