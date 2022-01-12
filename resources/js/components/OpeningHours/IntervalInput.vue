<template>
    <div>
        <input
            type="time"
            class="form-control form-input form-input-bordered"
            v-model="from"
            required
        >
        -
        <input
            type="time"
            class="form-control form-input form-input-bordered"
            v-model="to"
            required
        >
        <button class="btn btn-default btn-danger" @click.prevent="$emit('removeInterval')">-</button>
    </div>
</template>

<script>
export default {

    props: ['inputValue'],

    data: function () {
        return {
            value: this.inputValue,
        }
    },

    computed: {
        from: {
            get() {
                return this.value.split('-')[0]
            },
            set(value) {
                this.value = [value, this.to].join('-')
            },
        },

        to: {
            get() {
                return this.value.split('-')[1]
            },
            set(value) {
                this.value = [this.from, value].join('-')
            },
        },
    },

    watch: {
        value(value) {
            this.$emit('input', value)
        },
    },
}
</script>
