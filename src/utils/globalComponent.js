import contents from '../components/content.vue'
import newsList from '../components/newsList.vue'
import cardList from '../components/cardList.vue'
import lineList from '../components/lineList.vue'
import infoList from '../components/infoList.vue'
import introduceList from '../components/introduceList.vue'
import inspectorDetais from '../components/inspectorDetais.vue'

export default function plugins (Vue) {
  Vue.component('contents', contents)
  Vue.component('newsList', newsList)
  Vue.component('cardList', cardList)
  Vue.component('infoList', infoList)
  Vue.component('lineList', lineList)
  Vue.component('introduceList', introduceList)
  Vue.component('inspectorDetais', inspectorDetais)
}
