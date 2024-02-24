<template>
  <div class="card flex justify-content-center">
    <AutoComplete
      v-model="friendname"
      multiple
      dropdown
      :suggestions="searchdata"
      @complete="search"
      dropdown-icon="pi pi-search"
      @dropdown-click="visible=true"
    >
    </AutoComplete>
    <Dialog v-model:visible="visible">
      <div v-if="visible">
        <!-- @formdata is the action emitted by table component,always we can use only actions given by that component!!!! -->
        <Table :tabledata="Userdata" @formdata="(e) => fillUserForm(e)"></Table>
      </div>
    </Dialog>
  </div>
</template>
<script setup>
import AutoComplete from "primevue/autocomplete";
import Userdata from "../Userdata";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import Table from "../components/Table.vue";
const visible = ref(false);
const friendname = ref([]);
const searchdata = ref([]);

const search = (event) => {
  
  setTimeout(() => {
    if (!event.query.trim().length) {
      //Checks whether the event.query (search query) is empty or contains only
      //whitespace characters using trim().
      searchdata.value = []; // If the query is empty, it clears the searchdata array.
    } else {
      searchdata.value = Userdata.filter((user) =>
        user.username.toLowerCase().startsWith(event.query.toLowerCase())
      )
        //Filters the Userdata array based on the condition that user.username (converted to lowercase)
        // should start with the lowercase version of the event.query. It retrieves usernames that match the search query
        .map((user) => user.username);
      //Maps the filtered usernames to create a new array (searchdata.value)
      // containing only the usernames that match the search query.

      console.log("searchdata", searchdata.value);
    }
  }, 250);
};

const fillUserForm = (res) => {
  visible.value = false;
  console.log("value", res.username);
  friendname.value.push(res.username); //In order to new username string value to the friendname array should use push function
  console.log("friendname", friendname.value);
};
</script>
