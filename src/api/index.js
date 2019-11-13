/**
 * api 列表
 * @function
 * @param { Object } data - data数据
 * @returns {Promise}
 */

import http from '../utils/request'

export function getMenu (data) {
  return http({
    url: 'api.Menu/one_level',
    method: 'POST',
    data: data
  })
}

export function getTab (data) {
  return http({
    url: 'api.Menu/two_stage',
    method: 'POST',
    data: data
  })
}

export function getContents (data) {
  return http({
    url: 'api.Content/get_details',
    method: 'POST',
    data: data
  })
}

export function getInfoList (data) {
  return http({
    url: 'api.Info_List/get_list',
    method: 'POST',
    data: data
  })
}

export function getCardList (data) {
  return http({
    url: 'api.card_List/get_list',
    method: 'POST',
    data: data
  })
}

export function getLineList (data) {
  return http({
    url: 'api.Line_List/get_list',
    data: data,
    method: 'POST'
  })
}

export function getVillageList (data) {
  return http({
    url: 'api.Menu/street',
    data,
    method: 'POST'
  })
}

export function getSwiper (data) {
  return http({
    url: 'api.carousel/gets',
    method: 'POST',
    data
  })
}

export function getNewsList (data) {
  return http({
    url: 'api.New_List/get_list',
    data,
    method: 'POST'
  })
}

export function getNewsContent (data) {
  return http({
    url: 'api.New_List/get_details',
    data,
    method: 'POST'
  })
}

export function getInspectorDetails (data) {
  return http({
    url: 'api.inspector_Detais/get_details',
    method: 'POST',
    data
  })
}

export function getRecommendInfoList (data) {
  return http({
    url: 'api.Menu/recommend_1',
    method: 'POST',
    data
  })
}

export function getRecommendNewsList (data) {
  return http({
    url: 'api.Menu/recommend_2',
    method: 'POST',
    data
  })
}

export function getRecommendTabbar (data) {
  return http({
    url: 'api.Menu/recommend_3',
    method: 'POST',
    data
  })
}

export function getCommentList (data) {
  return http({
    url: 'api.Woodpecker/get_list',
    method: 'POST',
    data
  })
}

export function getCommentDetails (data) {
  return http({
    url: 'api.Woodpecker/get_details',
    data,
    method: 'POST'
  })
}

export function imageUpload (data) {
  return http({
    url: 'http://cx.xianghunet.com/admin.html?s=admin/api.plugs/upload',
    data,
    method: 'POST',
    ContentType: 'multipart/form-data'
  })
}

export function comment (data) {
  return http({
    url: 'api.Woodpecker/add',
    data,
    method: 'POST'
  })
}
