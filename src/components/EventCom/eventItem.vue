<template>
    <div class="event_item">
        <div class="top_info">
            <div class="left">
                <img class="avatar" :src="eventData.user.avatarUrl" alt="">
            </div>
            <div class="center">
                <div class="name">{{ eventData.user.nickname }}</div>
            </div>
            <div class="right"></div>
        </div>
        <div class="event_content">
            <div v-for="(keyword, index) in keywords" :key="index" class="keyword">{{ keyword }}</div>
            <div class="msg">{{ msg }}</div>
            <!--    18、分享单曲
                    19、分享专辑
                    17、28 分享电台节目
                    22、转发
                    39、发布视频
                    35、13 分享歌单
                    24、分享专栏文章
                    41、21 分享视频
                    56、七天会员
            -->
            <div class="pic">
                <img v-for="(pic, index) in eventData.pics" :key="index" :src="pic.originUrl" alt="#" />
            </div>
            <SongItem v-if="eventData.type === 18" :song-data="songData" :showdel="false" />
            <div v-if="eventData.type === 56">
                <img :src="resource.coverImgUrl" />
                <a :href="resource.webviewUrl">
                    <div class="resourceTitle">{{ resource.title }}</div>
                    <div class="resourceSub">{{ resource.subTitle }}</div>
                </a>
            </div>
            <div class="event_bottom">
                <div class="eventTime">{{ dateFormat(eventData.eventTime, 'yyyy-MM-dd hh:mm:ss') }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { dateFormat } from '@/utils'
import { formatSheet } from '@/utils/song'
import SongItem from '@/components/songItem/index.vue'
import type { EventDataInterface } from '@/types/public/event'

interface Props {
    eventData: EventDataInterface
}

const props = withDefaults(defineProps<Props>(), {
    eventData: () => {
        return {
            id: 0,
            json: '',
            type: 0,
            eventTime: 0,
            user: {
                nickname: '',
                userId: 0,
                avatarUrl: '',
                followed: false,
            },
            pics: [],
            ipLocation: {
                ip: '',
                location: '',
            }
        }
    }
})


// 处理每一条动态
const msg: ComputedRef<string> = computed(() => {
    const json = JSON.parse(props.eventData.json)
    return json.msg
})

// 抽取 msg 中的话题关键词（# xxx #）
const keywords: ComputedRef<string[]> = computed(() => {
     const json = JSON.parse(props.eventData.json)
     const msg = json.msg
     const pattern = /#(\w+)#/g
     const result = msg.match(pattern)
     return result || []
})

console.log(keywords.value)

// 区分不同类型动态做个性化展示
// 动态类型 18
const songData: ComputedRef = computed(() => {
    const json = JSON.parse(props.eventData.json)
    if (props.eventData.type === 18) {
        return formatSheet(json.song)
    }
    return {}
})

// 动态类型 56
const resource: ComputedRef = computed(() => {
    const json = JSON.parse(props.eventData.json)
    if (props.eventData.type === 56) {
        // console.log(json)
        return json.resource
    }
    return {}
})
</script>

<style scoped lang="less">
.event_item {
    margin-bottom: 20px;

    .top_info {
        display: flex;
        align-items: center;

        .left {
            margin-right: 20px;

            .avatar {
                width: 100px;
                height: 100px;
                border-radius: 50px;
            }
        }

        .center {
            .name {
                font-size: 30px;
                color: var(--my-text-color-black);
            }
        }
    }

    .event_content {
        padding-left: 120px;

        .msg {
            word-break: break-all;
            font-size: 28px;
            color: var(--my-text-color-black);
        }

        .resourceTitle {
            margin-top: 20px;
            font-size: 28px;
            font-weight: bold;
            color: var(--my-text-color-black);
        }

        .resourceSub {
            margin-top: 20px;
            font-size: 28px;
            color: var(--my-text-color-gray);
        }
    }

    .event_bottom {
        display: flex;

        .eventTime {
            font-size: 24px;
            margin-top: 20px;
            color: var(--my-text-color-gray);
        }
    }
}

.pic {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
    img {
        width: 30%;
    }
}
</style>