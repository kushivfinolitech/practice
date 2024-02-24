

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
  
<!-- Here we are applying if condition to show the table only when the value of show table is true
     also passing the prop to table the props data is Userdata array and expecting an emit from the 
     the child table that will be the formdata -->
  <Table v-if="showTable" :tabledata="Userdata"
   @formdata="(e) => emitData(e)" 
   ></Table>
  <!-- Here we are applying if condition to show the form only when the value of show form is true
       also passing the prop to form, the props data is userFormdata which was emitted by the table
       and expecting an emit from the  child table that will be the updateform -->
       <!-- <div class="ml-5">
        <Button v-if="showAddNewButton" class="ml-7 mr-7" icon="pi pi-plus" @click="addNewUser()"></Button>
       </div> -->
  <formpage v-if="showForm" :data="userFormData" @updateForm="(e) => emitedData(e)" @cancel="noemitedData"/>
  <!-- <formpage v-if="showForm2"/> -->
 
</template>

<script setup>

import { ref } from 'vue';
import formpage from './components/formpage.vue';
import Table  from './components/Table.vue';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import {i18n } from './i18n/index.js';

const showTable=ref(true);
const showForm=ref(false);
const showForm2=ref(false);
const showAddNewButton=ref(false);
const userFormData=ref();
const selectedLanguage = ref("");
const Userdata =ref([]);
const languages = [
  { name: "English", code: "en-US" },
  { name: "ಕನ್ನಡ", code: "en-IN" },
];

// the emited data from the table is being sent back to parent app.vue along with choosing what to display using v-if 
function emitData (res)
{
 showForm.value=true;
 showAddNewButton.value=true;
 showTable.value=false;
 showForm2.value=false;
 userFormData.value=res;
 const date=new Date(res.dob)
 res.dob=new Date(date)
 console.log("res",res)
 console.log("res.dob",res.dob,"date",date)
 // Here I am assigning the emitted value to the variable and storing emitted value in this variable called userFormData
 console.log("userFormData",userFormData);
}
function emitedData (editedRow)
{
  showForm.value=false;
  showAddNewButton.value=false;
  showTable.value=true;
  showForm2.value=false;
   
}

function noemitedData()
{
  console.log("change back")
  showForm.value=false;
  showTable.value=true;
  showForm2.value=false;
  showAddNewButton=false;
}
function addNewUser()
{
  showForm.value=false;
  showForm2.value=true;
  showTable.value=false;
  showAddNewButton.value=false;
}

function onlanguagechange() {
  i18n.global.locale.value = selectedLanguage.value.code;
  console.log("language now",i18n.global.locale.value)
}

</script>



