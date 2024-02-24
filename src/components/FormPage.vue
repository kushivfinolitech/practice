<template>
  <Card>
    <template #header>
      <div class="card flex justify-content-center"></div>
      <h1>
        <div class="font bold text-center justify-content-center">
          {{ $t("header.userdetails") }}
        </div>
      </h1>
     
    </template>
    <template #content>
      <div
        class="p-fluid ml-7 mr-7 mb-7 text-center bg-center flex align-items-center justify-content-center"
      >
        <div class="grid-container">
          <form @submit.prevent="onClick" data-testid="form-element">
            <div class="formgrid grid">
              <div class="sm:col-6 col-12 text-left mb-2 mt-2">
                <div class="font-bold">
                  <label for="username">{{ $t("fields.username") }}</label>
                </div>
                <InputText
                  id="username"
                  type="text"
                  data-testid="username"
                  v-model="formData.username"
                  style=""
                />
                <div class="ml-1">
                  <span v-if="v$.username.$error && submitted">
                    <small
                      class="text-red-500 text-sm"
                      v-for="(error, idx) of v$?.username?.$errors"
                      :key="idx"
                    >
                      {{ error.$message}}
                    </small>
                  </span>
                </div>
              </div>
              <div class="col-12 sm:col-6 text-left mb-2 mt-2">
                <div class="font-bold">
                  <label for="email">{{ $t("fields.emailid") }}</label>
                </div>
                <InputText
                  id="email"
                  data-testid="email-field"
                  type="text"
                  v-model="formData.email"
                />
                <div class="ml-1">
                  <span v-if="v$.email.$error && submitted">
                    <small
                      class="text-red-500 text-sm"
                      v-for="(error, idx) of v$?.email?.$errors"
                      :key="idx"
                    >
                      {{error.$message }}
                    </small>
                  </span>
                </div>
              </div>
              <div class="col-12 sm:col-6 text-left mb-2 mt-2">
                <div class="font-bold">
                  <label for="gender">{{ $t("fields.chooseGender") }}</label>
                </div>
                <div class="mt-2">
                  <RadioButton
                    v-model="formData.gender"
                    inputId="gender"
                    name="gender"
                    value="Female"
                  />
                  <label for="gender1" class="ml-2">
                    {{ $t("gender.female") }}
                  </label>
                  <RadioButton
                    v-model="formData.gender"
                    inputId="gender"
                    name="gender"
                    value="Male"
                  />
                  <label for="gender2" class="ml-2">
                    {{ $t("gender.male") }}
                  </label>
                  <RadioButton
                    v-model="formData.gender"
                    inputId="gender"
                    name="gender"
                    value="Transgender"
                  />
                  <label for="gender3" class="ml-2">
                    {{ $t("gender.transgender") }}
                  </label>
                </div>
              </div>
              <div class="col-12 sm:col-6 text-left mb-2 mt-2">
                <div class="font-bold">
                  <label for="dob">{{ $t("fields.dob") }}</label>
                </div>
                <Calendar
                  v-model="formData.dob"
                  showIcon
                  :date-format="dateFormat"
                  :show-button-bar="true"
                  @clear-click="formData.dob = null"
                  inputId="dob"
                >
                </Calendar>

                <div calss="align-content-center justify-content-center  ml-5 ">
                  <span v-if="v$.dob.$error && submitted">
                    <small
                      class="text-red-500 text-sm mt-1"
                      v-for="(error, idx) of v$?.dob?.$errors"
                      :key="idx"
                    >
                      {{ error.$message }}
                    </small>
                  </span>
                </div>
              </div>
              <div class="col-12 sm:col-6 text-left mb-2 mt-2">
                <div class="font-bold">
                  <label for="qualification">
                    {{ $t("fields.highQuali") }}
                  </label>
                </div>
                <Dropdown
                  v-model="formData.qualification"
                  :options="education"
                  optionLabel="name"
                  optionValue="code"
                  placeholder="highest qualification"
                  inputId="qualification"
                />
              </div>
              <div class="col-12 sm:col-6 text-left mb-2 mt-2">
                <label for="language" class="font-bold mr-2">{{
                  $t("fields.langKnown")
                }}</label>
                <div class="mt-2">
                  <Checkbox
                    v-model="formData.language"
                    inputId="language"
                    name="lang"
                    value="English"
                  />
                  <label for="lang1" class="ml-2">
                    {{ $t("languages.english") }}
                  </label>
                  <Checkbox
                    v-model="formData.language"
                    inputId="language"
                    name="lang"
                    value="Hindi"
                  />
                  <label for="lang2" class="ml-2">
                    {{ $t("languages.hindi") }}
                  </label>
                  <Checkbox
                    v-model="formData.language"
                    inputId="language"
                    name="lang"
                    value="Kannada"
                  />
                  <label for="lang3" class="ml-2">
                    {{ $t("languages.kannada") }}
                  </label>
                </div>
              </div>
              <div class="col-12 sm:col-6 text-left mb-2 mt-2">
                <div class="font-bold">
                  <label for="currency">{{ $t("fields.currSal") }}</label>
                </div>
                <InputNumber
                  v-model="formData.salary"
                  inputId="currency"
                  :locale="currentLocale"
                  mode="currency"
                  :currency="currency"
                ></InputNumber>
              </div>
              <div class="col-12 sm:col-6 text-left mb-2 mt-2">
                <div class="font-bold">
                  <label for="contact">{{ $t("fields.contact") }}</label>
                </div>
                <InputGroup>
                  <InputGroupAddon>+91</InputGroupAddon>
                  <InputText v-model="formData.contact" inputId="contact" />
                </InputGroup>
              </div>
              <div class="col-12 sm:col-6 text-left mb-2 mt-2">
                <div class="font-bold">
                  <label for="contact">{{ $t("fields.friends") }}</label>
                </div>
                <AutoComplete
                  v-model="friendname"
                  multiple
                  dropdown
                  :suggestions="searchdata"
                  @complete="search"
                  dropdown-icon="pi pi-search"
                  @dropdown-click="visible = true"
                ></AutoComplete>
              </div>
              <Dialog v-model:visible="visible">
                <div v-if="visible">
                  <!-- @formdata is the action emitted by table component,always we can use only actions given by that component!!!! -->
                  <Table
                    :tabledata="Userdata"
                    @formdata="(e) => fillUserForm(e)"
                  ></Table>
                </div>
              </Dialog>
              <div class="col-12 sm:col-6 text-left mb-2 mt-2">
                <div class="font-bold"></div>
              </div>
              <div class="col text-right">
                <span>
                  <Button
                    label="Go Back"
                    @click="change()"
                    data-testid="cancel"
                    class="mt-3"
                    >{{ $t("fields.goback") }}</Button
                  >
                </span>
              </div>
              <div class="col">
                <span>
                  <Button
                    label="Save "
                    type="submit"
                    class="mt-3"
                    data-testid="save-button"
                    >{{ $t("fields.save") }}</Button
                  >
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="formgrid grid"></div>
    </template>
  </Card>
</template>
<script setup>
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import { ref, defineEmits, defineProps, onBeforeMount, computed } from "vue";
import Checkbox from "primevue/checkbox";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import education from "../EducationOptions";
import Card from "primevue/card";
import { useVuelidate } from "@vuelidate/core";
import { DateTime } from "luxon";
import { i18n, required, email, withI18nMessage } from '../i18n/index.js'
import Table from "./Table.vue";
import Userdata from "../Userdata";
import AutoComplete from "primevue/autocomplete";
import { useI18n } from "vue-i18n";
import Dialog from "primevue/dialog";
import ky from 'ky';

const { t } = useI18n({ useScope: "global" });
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
  console.log("friends length", friendname.value.length);
  if (
    !friendname.value.includes(res.username) &&
    props.data.username != res.username
  ) {
    // To check whether the username we are adding to friends array is already present in the array use array.includes() method
    friendname.value.push(res.username);
    console.log("friendname", friendname.value);
  }
  //In order to new username string value to the friendname array should use push function
  console.log("friendname", friendname.value);
};
const currentLocale = computed(() => {
  return i18n.global.locale;
});
const currency = computed(() => {
  return t("currencyformat.currency");
});
const dateFormat = computed(() => {
  return t("dateformat.format");
});
const formData = ref({
  username: "",
  email: "",
  dob: "",
});
const submitted = ref(false);
function minDateValidation(input_dob) {
  console.log("inside minDate");
  var start = new Date(DateTime.now());
  console.log("Strat date", start);
  var end = new Date(formData.value.dob);
  console.log("end Date", formData.value.dob);
  var diffYears = start - end;
  console.log("diff years", diffYears);
  if (diffYears >= 568057924683) return true;
  else return false;
} 
const age = withI18nMessage(minDateValidation)
const rules = ref({
  username: {required},
  email: {required,email},
  dob: {required, minDateValidation:{age , minDateValidation}}
});
const v$ = useVuelidate(rules.value, formData);
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {};
    },
  },
});
const emits = defineEmits(["updateForm", "cancel"]);
onBeforeMount(() => {
  formData.value = props.data;
  console.log("formdata.value ",formData.value.qualification)
 
});
async function onClick() {
  console.log("inside onclick");
  const isFormCorrect = await v$.value.$validate();
  console.log("isFormCorrect", isFormCorrect);
  if (!isFormCorrect) {
    submitted.value = true;
    console.log("inside");
    return;
  }
  console.log("submit");
  
  try 
 {
  console.log("submit1");
  const formEmitData = ref();
  formEmitData.value = formData.value;
  const date = new Date(formData.value.dob);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  formData.value.dob = `${year}-${month}-${day}`;
  console.log("formdata.dob" , formData.value.dob)
  console.log("formData.value", formData.value)
  const response = await ky.put('/api/users', { json : formData.value});
  if(response.ok)
  {
  console.log('Data updated successfully!');
    } else {
      console.error('Failed to update data:', response.status);
    }
  
  emits("updateForm", formEmitData.value);
 }
 catch(error){
  console.error('Error fetching data:', error);
 }

}
function change() {
  emits("cancel");
}
friendname.value = props.data.friends;
console.log("friends name in database", props.data.friends);


</script>
