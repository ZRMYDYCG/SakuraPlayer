/**
 * @description: 项目全局配置文件
 */
import type { IMenuConfig } from './interface'

// 底部菜单配置
export const menuList: IMenuConfig[] = [
    {
        name: '发现',
        url: '/home',
        icon: 'icon-faxian'
    },
    {
        name: '播客',
        url: '/boke',
        icon: 'icon-zhiboziyuan'
    },
    {
        name: '我的',
        url: '/mine',
        icon: 'icon-yinle'
    },
    {
        name: '关注',
        url: '/follow',
        icon: 'icon-guanzhu'
    },
    {
        name: '云村',
        url: '/village',
        icon: 'icon-shequ-active'
    }
]
