<template>
    <TransitionRoot as="template">
        <Dialog as="div" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                            <DialogTitle
                                as="h3"
                                class="text-lg font-medium leading-6 text-gray-900"
                            >
                                Adding Video
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    Add a video to CamilloTube
                                </p>
                            </div>
                            <form class="py-2" action="#" method="POST">
                                <input type="hidden" name="remember" value="true" />
                                <div class="space-y-3">
                                    <div>
                                        <label class="text-black text-sm" for="video-title">Video title</label>
                                        <input id="video-title" name="title" type="text" required="true" class="relative block w-full appearance-none rounded-none rounded-[0.5rem] border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Insert title" />
                                    </div>
                                    <input type="file" name="video-upload" id="video-upload" accept="video/*">
                                </div>
                            </form>
                            <div class="mt-4 space-x-2">
                                <button
                                    type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="submitVideo"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    @click="closeDialog"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
export default {
    props: {
        closeDialogVideo: Function,
        addVideo: Function
    },
    data() {
        return {
            closeDialog: this.closeDialogVideo,
            addvideo: this.addVideo
        }
    },
    methods: {
        submitVideo() {
            const title = document.getElementById('video-title').value.trim()
            if (title.length > 0) this.addvideo(title)
            this.closeDialog()
        }
    }
}
</script>

<script setup>
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
</script>
