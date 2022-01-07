export default {
    props: {
        showDialog: {
            type: Boolean, 
            default: false
        }
    },
    methods: {
        closeDialog() {
            this.$emit('update:showDialog', false)
        }
    }
}