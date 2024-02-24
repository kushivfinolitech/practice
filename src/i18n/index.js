import { createI18n } from 'vue-i18n'
import { ref } from 'vue';
import * as validators from '@vuelidate/validators'

const messages= {
    'en-US': {
        header:
        {
           userdetails:"User Details",
           totalrecords : "Total Records"
        },
        fields:{
       username:"Username",
       emailid:"Email ID",
       chooseGender:"Choose Your Gender",
       gender:"Gender",
       dob:"Date Of Birth",
       highQuali:"Highest Qualification",
       langKnown:"Languages Known",
       currSal:"Current Salary",
       contact:"Contact",
       goback:"Go Back",
       save:"Save",
       friends:"Friends"
        },
        languages:
        {
            english:"English",
            kannada:"Kannada",
            hindi:"Hindi"
        },
        gender:
        {
            female:"Female",
            male:"Male",
            transgender:"Transgender"
        },
        currencyformat:
        {
          currency:"USD"
        
        },
        dateformat:
        {
            format:"MM/dd/yy"
        },
        education:
        [
        { name: 'Post Graduate', code: 'PG' },
        { name: 'Under Graduate', code: 'UG' },
        { name: 'Class 12', code: 'C12' },
        { name: 'Class 10', code: 'C10' },
        { name: 'Below Class 10', code: 'B10' }
        ],
        validations:
        {
            required:"Value is Required",
            age:"Age should be above 18 years",
            email:"Value is not a valid email address"
        }
       
    },
    'en-IN':{
        header:
        {
           userdetails:"ಬಳಕೆದಾರರ ವಿವರಗಳು"
        },
        fields:{
        username:"ಬಳಕೆದಾರ ಹೆಸರು",
        emailid:"ಇಮೇಲ್ ಐಡಿ",
        chooseGender:"ನಿಮ್ಮ ಲಿಂಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        gender:"ಲಿಂಗ",
        dob:"ಹುಟ್ತಿದ ದಿನ",
        highQuali:"ಅತ್ಯುನ್ನತ ಅರ್ಹತೆ",
        langKnown:"ತಿಳಿದಿರುವ ಭಾಷೆಗಳು",
        currSal:"ಈಗಿನ ಸಂಬಳ",
        contact:"ಸಂಪರ್ಕಿಸಿ",
        goback:"ಹಿಂದೆ",
        save:"ಸಲ್ಲಿಸು",
        friends:"ಸ್ನೇಹಿತರು"
        },
        languages:
        {
            english:"ಆಂಗ್ಲ",
            kannada:"ಕನ್ನಡ",
            hindi:"ಹಿಂದಿ"
        },
        gender:
        {
            female:"ಹೆಣ್ಣು",
            male:"ಪುರುಷ",
            transgender:"ಇತರರು"
        },
        currencyformat:
        {
          currency:"INR"
        
        },
        dateformat:
        {
            format:"dd/mm/yy"
        },
        education:
        [
         { name: 'ಸ್ನಾತಕೋತ್ತರ ಪದವಿ', code: 'PG' },
         { name: 'ಪದವಿಪೂರ್ವ', code: 'UG' },
         { name: 'ತರಗತಿ 12', code: 'C12' },
         { name: 'ತರಗತಿ 10', code: 'C10' },
         { name: '10 ನೇ ತರಗತಿಗಿಂತ ಕಡಿಮೆ', code: 'B10' }
        ],
        validations:
        {
            required:"ಮೌಲ್ಯ ಅಗತ್ಯವಿದೆ",
            age:"ವಯಸ್ಸು ಕನಿಷ್ಠ 18 ಆಗಿರಬೇಕು",
            email:"ಮೌಲ್ಯವು ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸವಲ್ಲ"
        }
       
     
    }
}
const numberFormats=
{
    'en-US':
    {
      currency:
      {
        style:'currency',
        currency:'USD'
      }
    },

    'en-IN':
    {
      currency:
      {
        style:'currency',
        currency:'INR'
      }
    }
}

 const datetimeFormats=
 {
    'en-US':
    {
        long:
        {
            
            month: 'long',
            day: '2-digit',
            year: 'numeric',
        }
    },
    'en-IN':
    {
        long:
        {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        }
    }
 }
export const i18n = createI18n({
    locale : import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale : import.meta.env.VITE_FALLBACK_LOCALE,
    legacy : false,
    globalInjection : true,
    messages,
    numberFormats,
    datetimeFormats
});
const { createI18nMessage } = validators
export const msg = messages;
export const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })
export const required = withI18nMessage(validators.required)
export const email = withI18nMessage(validators.email)




 