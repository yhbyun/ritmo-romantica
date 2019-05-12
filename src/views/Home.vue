<template>
    <div class="bg-black text-white flex-1 ml-56 p-5">

        <div class="flex flex-wrap -mx-2 h-full">
            <div class="w-full lg:w-1/2 px-2">
                <div class="border h-full text-sm text-grey-dark flex items-center justify-center">
                    <iframe src="https://ritmoromantica.pe/radioenvivo" class="w-full h-full"></iframe>
                </div>
            </div>
            <div class="w-full lg:w-1/2 px-2">
                <div class="w-full pb-4" style="height:50%">
                    <div class="border h-full text-sm text-grey-dark flex items-center justify-center">
                        <iframe src="https://translate.google.com/" class="w-full h-full"></iframe>
                    </div>
                </div>
                <div class="w-full" style="height:50%">
                    <div class="border h-full text-sm text-grey-dark flex items-center justify-center">
                        <iframe src="https://dict.naver.com/eskodict/#/main" class="w-full h-full"></iframe>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'home',
}
</script>
