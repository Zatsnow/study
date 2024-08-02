import Vue from 'vue'
import {getDictByCode,getDictByCodeAndLabel} from '../api/api'

Vue.prototype.getByCode =async function (code){
    const res = await getDictByCode({ code: code })
    if (res.code == 1000) {
      return res.data
    } else {
      this.$notify.error({
        title: '错误',
        message: '字典获取错误,请稍后重试!'
      })
    }
}

Vue.prototype.getByLabel =async function (code,label){
    const res = await getDictByCodeAndLabel({ code: code, label: label })
    if (res.code == 1000) {
      return res.data
    } else {
    this.$notify.error({
      title: '错误',
      message: '字典值获取错误,请稍后重试!'
    })
  }
}