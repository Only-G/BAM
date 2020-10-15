import Vue from "vue"

import deltes from "./deltes"
let obj = {
    deltes
}

for (let i in obj) {
    Vue.component(i, obj[i])
}