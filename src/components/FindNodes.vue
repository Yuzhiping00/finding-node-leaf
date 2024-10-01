<script setup>
import { ref, watch } from "vue";
let methodText = ref(null);
let highestCallerCount = ref(0);
let emptyContentErrorMsg = ref(null)
let leadingSpacesErrorMsg = ref(null)

defineProps({
  msg: {
    type: String,
    required: true,
  },
});

function calculateNodeLeaf() {
  // Split the input text into an array of lines
  let allMethods = [];

  // without content input
  if (methodText.value === null || methodText.value.trim() === '') {
    emptyContentErrorMsg.value = 'Please enter content to count node leaf.'
    leadingSpacesErrorMsg.value = null
    highestCallerCount.value = 0
    return 0
  }

  // with content input
  emptyContentErrorMsg.value = null
  // separated string into lines of content and remove the empty lines
  const methodLines = methodText.value.split(/\r?\n/).filter(line => line.trim() !== '')
  for (let i = 0; i < methodLines.length; i++) {
    if(countLeadingSpaces(methodLines[0]) > 0){
      leadingSpacesErrorMsg.value = "Please remove the leading spaces from the first line."
      highestCallerCount.value = 0
      break
    }
    leadingSpacesErrorMsg.value = null
    if (i === methodLines.length - 1) {
      allMethods.push(methodLines[i])
      highestCallerCount.value = allMethods.length
      break
    } else {
      let leadingSpacesCount_origin = countLeadingSpaces(methodLines[i])
      let leadingSpacesCount_latter = countLeadingSpaces(methodLines[i + 1])
      if (leadingSpacesCount_origin === leadingSpacesCount_latter) { // orginal line has some empty spaces as latter line
        allMethods.push(methodLines[i])
        highestCallerCount.value = allMethods.length
      } else if (leadingSpacesCount_origin < leadingSpacesCount_latter) {
        continue
      } else {
        allMethods.push(methodLines[i])
        highestCallerCount.value = allMethods.length
      }
    }
  }
  return highestCallerCount.value
}

function countLeadingSpaces(str) {
  let count = 0;
  let charArray = Array.from(str)
  if (charArray.length > 0) {
    for (let i = 0; i < charArray.length; i++) {
      if (charArray[i] === " ") {
        count++;
      } else {
        break;
      }
    }
  }
  return count;
}

watch(methodText, (newContent)=>{
  if(newContent?.trim() === ""){
    highestCallerCount.value = 0
    emptyContentErrorMsg.value = null
    leadingSpacesErrorMsg.value = null 
  }
})
</script>

<template>
  <p>{{ msg }}</p>
  <textarea v-model="methodText" placeholder="no space for the first line"></textarea>
  <br />
  <button class="button" @click="calculateNodeLeaf">Submit</button>
  <div class="margin-customized" v-if="highestCallerCount > 0">
    Number of node leaf: {{ highestCallerCount }}
  </div>
  <div v-if="emptyContentErrorMsg" class="error-style">
    {{ emptyContentErrorMsg }}
  </div>
  <div v-if="leadingSpacesErrorMsg" class="error-style">
    {{ leadingSpacesErrorMsg }}
  </div>
</template>

<style scoped>
p {
  font-size: 24px;
  color: rgba(237, 186, 4, 0.931);
}

textarea {
  width: 80%;
  height: 300px;
}

.button {
  border-radius: 8px;
  color: rgba(243, 8, 133, 0.931);
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  background-color: rgb(227, 225, 222);
}

.margin-customized {
  margin-top: 10px;
  color: rgba(237, 186, 4, 0.931);
  font-size: 18px;
}

.error-style {
  font-size: 16px;
  margin-top: 10px;
  color: rgba(242, 85, 169, 0.931);
}
</style>
