<template>
    <DialogVideo :addVideo="addVideo" :show="isDialogVideoOpen" :close-dialog-video="closeDialogVideo" @close="closeDialogVideo" />
    <Disclosure as="nav" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="font-bold text-xl space-x-1">
                    <span>Camillo</span>
                    <span class="bg-gray-500/50 rounded-md p-1 px-2 text-[#121212]">Tube</span>
                </div>
                <div class="flex flex-1 space-x-3 justify-center items-stretch">
                    <input class="w-[50%] bg-black h-[2.5rem] p-2 focus:outline-none border-2 border-gray-500/50 rounded-md" placeholder="Search..."/>
                    <button class="bg-gray-500/50 px-5 rounded-md text-black">
                        <MagnifyingGlassIcon class="w-5 cursor-pointer"/>
                    </button>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 ">
                    <button type="button" @click="openDialogVideo()" class="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>

                    <!-- Profile dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <div>
                            <MenuButton class="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-[#121212]">
                                <span class="sr-only">Open user menu</span>
                                <object v-if="videosready.value" class="h-8 w-8 rounded-full object-cover hover:bg-black" :data="user.pfp" type="image/png"></object>
                                <div v-else class="h-8 w-8 rounded-full skeletonAnim" ></div>
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
        <div class="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <Video v-if="videosready.value" v-for="video in videos" :key="video.id" :videoDetails="video" />
            <SkeletonVideo v-else v-for="(n, index) in videotoload" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videos: [],
            users: [],
            previews: [],
            usersavatars: [],
            videotoload: 5,
            videosready: {
                value: false
            },
            user: {
                uid: 12412125,
                name: 'caamillo',
                pfp: ''
            }
        }
    },
    computed: {
        isVideoDone() {
            return [this.users, this.previews, this.usersavatars]
        }
    },
    watch: {
        isVideoDone: {
            deep: true,
            handler: function([users, previews, usersavatars]) {
                this.unghostElements(users, previews, usersavatars)
            }
        }
    },
    methods: {
        getRndImg: async () => fetch('https://picsum.photos/350/200'),
        getRndUsrs: async (num) => fetch('https://random-data-api.com/api/v2/users?size=' + num),
        async addVideo(title) {
            this.videos.push({
                user: this.user,
                id: Math.floor(Math.random() * (9999999 - 1000000) + 1000000),
                uploaded: new Date(),
                views: Math.floor(Math.random() * 1000),
                duration: Math.floor(Math.random() * 1000),
                preview: URL.createObjectURL(await (await this.getRndImg()).blob()),
                title: title
            })
        },
        unghostElements(users, previews, usersavatars) {
            if (users.length < this.videotoload + 1) return
            else if (usersavatars.length < this.videotoload + 1) return
            else if (previews.length < this.videotoload) return
            this.videosready.value = true
            this.user.pfp = this.users[this.videotoload].avatar
            for (let i = 0; i < this.videotoload; i++) {
                this.videos.push({
                    id: Math.floor(Math.random() * (9999999 - 1000000) + 1000000),
                    title: `Titolo Video No.${ i }`,
                    user: {
                        uid: users[i].uid,
                        name: users[i].username,
                        pfp: users[i].avatar
                    },
                    uploaded: new Date(),
                    views: Math.floor(Math.random() * 1000),
                    duration: Math.floor(Math.random() * 1000),
                    preview: previews[i]
                })
            }
        }
    },
    mounted() {
        console.log('ciao')
        this.getRndUsrs(this.videotoload + 1)
            .then(res => res.json())
            .then(data => {
                this.users.push(...data)
                for (let user of data) {
                    fetch(user.avatar)
                        .then(res => res.blob())
                        .then(blobImg => {
                            const blobImgURL = URL.createObjectURL(blobImg)
                            this.usersavatars.push(blobImgURL)
                        })
                }
            })
        for (let i = 0; i < this.videotoload; i++) {
            this.getRndImg()
                .then(res => res.blob())
                .then(blobImg => {
                    const blobImgURL = URL.createObjectURL(blobImg)
                    this.previews.push(blobImgURL)
                })
        }
    }
}
</script>

<script setup>
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import Video from '../Components/Video.vue'
import DialogVideo from '../Components/DialogVideo.vue'
import SkeletonVideo from '../Components/SkeletonVideo.vue'

const isDialogVideoOpen = ref(false)

const openDialogVideo = () => {
    isDialogVideoOpen.value = true
}

const closeDialogVideo = () => {
    isDialogVideoOpen.value = false
}
</script>

<style>
    .skeletonAnim {
        background-color: #1d1d1d;
        animation: skeletonAnim 1.5s alternate infinite ease-in-out;
    }
    @keyframes skeletonAnim {
        from {
            background-color: #1d1d1d;
        }
        to {
            background-color: #343434;
        }
    }
</style>
