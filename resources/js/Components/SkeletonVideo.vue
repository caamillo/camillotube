<template>
    <div class="rounded-lg cursor-pointer w-[380px] m-2 p-3 hover:bg-black flex flex-col">
        <div class="rounded-md skeletonAnim h-[200px] w-full object-cover">
        </div>
        <div class="flex items-center space-x-3">
            <div class="rounded-full w-[30px] aspect-square skeletonAnim"></div>
            <div class="desc p-2 space-y-3 w-full">
                <div class="h-3 rounded-md w-[80%] skeletonAnim"></div>
                <div class="h-2.5 rounded-md w-[40%] skeletonAnim"></div>
                <div class="h-2.5 rounded-md w-[80%] skeletonAnim"></div>
            </div>
        </div>
    </div>
</template>