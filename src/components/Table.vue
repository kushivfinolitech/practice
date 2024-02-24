<template>
  <Toast></Toast>
  <div class="card flex justify-content-center font-bold text-2xl mt-5">
    {{  $t("header.userdetails") }}
    
  </div>
  <div class="p-grid p-dir-col">
    <div
      class="card p-fluid sm:shadow-6 ml-7 mr-7 surface-card text-center mt-7 bg-center flex align-items-center justify-content-center"
    >
      <div class="p-col w-full mt-5">
        
        <DataTable
          v-model:selection="selectedUser"
          selection-mode="single"
          @rowSelect="(e) => onRowSelect(e)"
          :value="newdata"
          :paginator="true"
          :rows="5"
          data-testid="table-component"
          
        >
          <!-- Very Important : to populate the table we need some data ,that data is coming from parent , so to get that data from parent
                through prop i will assign the prop data to table value (value is an inbuilt prop in prime dataTable) -->
          
          <Column field="username" :header="userName"></Column>
          <Column field="email" :header="emailId"></Column>
          <Column field="gender" :header="genderSelect">
            <template #body="{data}">
              {{ convertGender(data.gender) }}

            </template>
          
          </Column>
          <Column field="dob" :header="dob" data-testid="dob" dataType="date">
            <template #body="{ data }">
              {{ formatDate(data.dob) }}
            </template>
            <!-- the date will be visible in UI how you have stored in the database ,but we can change the format
                   of that date by formatting it so i am using slotsprops here # is the short hand for named slot 
                   in the slot it has that columns data and i am passing that required data as parameter for the 
                   function -->
           </Column>

          <Column field="qualification" :header="qualification"> 
            <template #body="{data}">
              {{ convertQual(data.qualification) }}

            </template>
          
          </Column>

          <Column field="salary" :header="salary" :style="'text-align:right'">
            <template #body="{ data }">
              {{ formatSalary(data.salary) }}
            </template>
            </Column
          >
          <Column>
            <template #body="slotsProps">
              <Button icon="pi pi-trash"  rounded severity="danger" @click="deleteRow(slotsProps.data)">
              </Button>
            </template>
          </Column>
        </DataTable>
        
        <div class="grid">
          <div class="col">
            <div
              class="p-col-12 p-sm-3 text-center border-round-sm bg-primary font-bold"
            >
              <Button
                label="SORT IN ASCENDING"
                @click="onClickSortAsc"
                data-testid="sortAsc"
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
          </div>
          <div class="col">
            <div
              class="p-col-12 p-sm-3 text-center border-round-sm bg-primary font-bold"
            ></div>

            <Button
              label="SORT IN DESCENDING"
              @click="onClickSortDec"
              data-testid="sortDesc"
              class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ky from 'ky';
import Button from "primevue/button";
import { useToast } from 'primevue/usetoast';
import Toast from "primevue/toast";
import { ref,onBeforeMount } from "vue";
import {i18n,msg } from '../i18n/index.js'
import { computed } from "@vue/reactivity";
import { useI18n } from 'vue-i18n';
const newdata = ref([]);
const selectedUser = ref();

const toast = useToast();
const {t ,tm ,n ,d } = useI18n({useScope: 'global'})
const userName = computed(()=>
{
   return t("fields.username")
})
const emailId = computed(()=>
{
   return t("fields.emailid")
})
const genderSelect = computed(()=>
{
   return t("fields.gender")
})
const qualification = computed(()=>
{
   return t("fields.highQuali")
})
const salary = computed(()=>
{
   return t("fields.currSal")
})
const dob = computed(()=>
{
   return t("fields.dob")
})

const emits = defineEmits(["formdata", "cancel"]);

function onRowSelect(event) {
  
  emits("formdata", event.data);
}
const props = defineProps({
  tabledata: {
    type: Array,
    default() {
      return [];
    },
  },
});


// Below in onBefore mount() we will execute what to be done even before that component is mounted
// I want to convert the codes provided in the database with their fullform names so converting that
// codes into required names,here education is an array imported from an javascript file.
onBeforeMount(async() => {
  // newdata.value = props.tabledata;
  // console.log("newdata" +  newdata.value)
  try {
    
    const response = await ky.get('/api/users');
    const data = await response.json();
   
    // Assuming the fetched data structure is an array of users
    for(let i=0;i<data.length;i++){
      newdata.value.push(data[i].a); 
      
    }
    console.log("data", newdata.value)
   // Assign fetched data to Userdata ref variable
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function onClickSortAsc() {
  let sortedList = newdata.value.map((item) => item).sort((a, b) => {
    const date1 = new Date(a.dob);
    const date2 = new Date(b.dob);

    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else return 0;
  });
  console.log("sorted", newdata.value, sortedList);
  newdata.value = sortedList;
}
function onClickSortDec() {
  let sortedList = newdata.value
    .map((item) => item)
    .sort((a, b) => {
      const date1 = new Date(a.dob);
      const date2 = new Date(b.dob);

      if (date1 < date2) {
        return 1;
      } else if (date1 > date2) {
        return -1;
      } else return 0;
    });
  console.log("sorted", newdata.value, sortedList);
  newdata.value = sortedList;
}



const formatDate = (dob) => {
  let date=new Date(dob)
  // "1988-07-30 here this string date is read as year-month-day
  console.log("Date ", date)
    return d(date,"long");
};

const formatSalary = (salary) => {
      return n(salary,"currency")
};

const convertQual=(qual) =>
{
  // tm is a function given by the vue i18n which access the global messages inside the file
  for(let i=0;i<tm('education').length;i++)
    {
      if(tm('education')[i].code==qual)
      {
         return tm('education')[i].name;
      }
    }
}
const convertGender = (gen) =>
{
  // t is  afunction given by vue i18n which translates the global messages inside the file
    if(gen == "Female")
    {
      return t("gender.female")
    }
    else if(gen == "Male")
    {
      return t("gender.male")
    }
    else if(gen == "Transgender")
    {
      return t("gender.transgender")
    }
  }
function deleteRow(rowdata)
{
  console.log("rowdata inside delete ", rowdata)
  for( let i=0;i<newdata.value.length;i++)
  {
    if(rowdata.id == newdata.value[i].id )
    {
      console.log("newdata.value[i].id",newdata.value[i].id)
      newdata.value.splice(i,1)
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'Row deleted', life: 3000 });
      // we use toast when we want some message or notification to appear on performing some action.
      console.log("after toast")
    }
  }
}


</script>
