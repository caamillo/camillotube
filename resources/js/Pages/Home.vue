<template>
    <DialogVideo :show="isDialogVideoOpen" :close-dialog-video="closeDialogVideo" @close="closeDialogVideo" />
    <Disclosure as="nav" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="flex flex-1 space-x-3 items-center justify-center sm:items-stretch sm:justify-start">
                    <input class="w-[50%] bg-black h-[2.5rem] p-2 focus:outline-none border-2 border-gray-500/50 rounded-md"/>
                    <button class="bg-gray-500/50 px-5 rounded-md text-black">
                        <MagnifyingGlassIcon class="w-5 cursor-pointer"/>
                    </button>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button type="button" @click="openDialogVideo()" class="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>

                    <!-- Profile dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <div>
                            <MenuButton class="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#121212]">
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </MenuButton>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ">
                                <MenuItem v-slot="{ active }">
                                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Profile</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>
    </Disclosure>
    <div class="flex justify-center">
        <div class="flex flex-wrap w-[85%] md:justify-start justify-center">
            <Video v-for="video in videos" :key="video.id" :videoDetails="video" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videos: []
        }
    },
    methods: {
        getRndImg: async () => fetch('https://picsum.photos/350/200'),
        getRndUsrs: async (num) => fetch('https://random-data-api.com/api/v2/users?size=' + num),
    },
    async mounted() {
        const numvideos = 5
        const users = await (await this.getRndUsrs(numvideos)).json()
        for (let i = 0; i < numvideos; i++) {
            this.videos.push({
                id: `video-${i}`,
                title: `Titolo Video No.${i}`,
                user: {
                    uid: users[i].uid,
                    name: users[i].username,
                    pfp: users[i].avatar
                },
                uploaded: new Date(),
                views: Math.floor(Math.random() * 1000),
                duration: Math.floor(Math.random() * 1000),
                preview: URL.createObjectURL(await (await this.getRndImg()).blob())
            })
        }
    }
}
</script>

<script setup>
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import Video from '../Components/Video.vue'
import DialogVideo from '../Components/DialogVideo.vue'

const isDialogVideoOpen = ref(false)

const openDialogVideo = () => {
    isDialogVideoOpen.value = true
}

const closeDialogVideo = () => {
    isDialogVideoOpen.value = false
}
</script>
