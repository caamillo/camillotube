<template>
    <a :href="`watch?v=${ details.id }`" @mouseenter="setIsHoverVideo(true)" @mouseleave="setIsHoverVideo(false)" class="rounded-lg cursor-pointer w-[380px] m-2 p-3 hover:bg-black flex flex-col">
        <div class="relative">
            <div :class="[isHoverVideo ? 'opacity-100' : 'opacity-0']" class="w-full transition-all duration-100 flex justify-end items-end p-2 h-[100px] bg-gradient-to-t from-black absolute bottom-0 z-10">
                {{ getTimeFormat(details.duration) }}
            </div>
            <img :src="details.preview" class="rounded-md h-[200px] w-full object-cover">
        </div>
        <div class="flex items-center space-x-3">
            <img :src="details.user.pfp" class="rounded-full w-[30px] h-[30px] object-cover">
            <div class="desc p-2">
                <h1>{{ details.title }}</h1>
                <h2 class="text-white/50 text-sm">{{ details.user.name }}</h2>
                <div class="text-sm text-white/50 flex space-x-3">
                    <h2>{{ details.views }} views</h2>
                    <span>•</span>
                    <h2>{{ dayjs(details.uploaded).fromNow() }}</h2>
                </div>
            </div>
        </div>
    </a>
</template>

<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import { ref } from 'vue'

const isHoverVideo = ref(false)

const setIsHoverVideo = (value) => {
    isHoverVideo.value = value
}
</script>

<script>
export default {
    name: "Video",
    props: {
        videoDetails: Object
    },
    data() {
        return {
            details: this.videoDetails
        }
    },
    methods: {
        getTimeFormat(duration) {
            // Hours, minutes and seconds
            var hrs = ~~(duration / 3600);
            var mins = ~~((duration % 3600) / 60);
            var secs = ~~duration % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }
    }
}
</script>
