/*
 * @Author: ZRMYDYCG
 * @Date: 2024-07
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
 */
module.exports = {
	plugins: {
		'postcss-pxtorem': {
			rootValue({
				file
			}) {
				return file.indexOf('vant') !== -1 ? 37.5 : 75;
			},
			propList: ['*'],
		},
	},
}
