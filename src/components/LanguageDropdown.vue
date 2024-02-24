<template>
 <div class="card flex justify-content-center">
    <Dropdown
      v-model="selectedLanguage"
      :options="languages"
      optionLabel="name"
      placeholder="Select a Language"
      class="w-full md:w-14rem"
      @change="onlanguagechange"
    />  
  </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
const selectedLanguage = ref( { name: "English", code: "en-US" })
const languages = [
  { name: "English", code: "en-US" },
  { name: "ಕನ್ನಡ", code: "en-IN" },
];
function onlanguagechange()
{
   const lang=ref(selectedLanguage.value)
}
</script>