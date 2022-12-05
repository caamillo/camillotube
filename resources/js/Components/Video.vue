<template>
    <div class="rounded-lg cursor-pointer w-[380px] m-2 p-3 hover:bg-black flex flex-col">
        <img :src="details.preview" class="rounded-md h-[200px] w-full object-cover">
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
    </div>
</template>

<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
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
    }
}
</script>
