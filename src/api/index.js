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
    url: 'api.InfoList/get_list',
    method: 'POST',
    data: data
  })
}

export function getCardList (data) {
  return http({
    url: 'api.cardList/get_list',
    method: 'POST',
    data: data
  })
}
