<template>
    <div>
        <el-alert title="试用版：仅限查看，请联系作者购买正式版！" type="info" :closable="false" :show-icon="true" v-show="testMode" />
    </div>
</template>

<script>
import ElAlert from 'element-ui/lib/alert';
import db from '../utils/dbutil'

export default {
    name: 'main-page',
    components: { ElAlert },
    data() {
        return {
            testMode: true
        }
    },
    created() {
        db.init()
    },
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link)
        }
    }
}
</script>
