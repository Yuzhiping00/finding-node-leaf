<script setup>
import { ref, watch } from "vue";
let methodText = ref(null);
let highestCallerCount = ref(0);
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
      if (leadingSpacesCount_origin === leadingSpacesCount_latter) {
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
    leadingSpacesErrorMsg.value = null 
  }
  calculateNodeLeaf()
})

async function copyNumberToClipboard() {
  try{
    await navigator.clipboard.writeText(highestCallerCount.value)
    console.log("Text copied to clipboard successfully!")
  }catch(err){
    console.error('Failed to copy test: ', err)
  }
}
</script>

<template>
  <p>{{ msg }}</p>
  <textarea v-model="methodText" placeholder="Place content here"></textarea>
  <br />
  <div class="margin-customized" v-if="highestCallerCount >= 0 && leadingSpacesErrorMsg === null">
    Number of node leaf: <span class="number-color">{{ highestCallerCount }}</span>
    <button @click="copyNumberToClipboard" v-if="highestCallerCount > 0 && leadingSpacesErrorMsg === null" >Copy</button>
  </div>
  <div v-if="leadingSpacesErrorMsg" class="error-style">
    {{ leadingSpacesErrorMsg }}
  </div>
</template>

<style scoped>
p {
  font-size: 24px;
  color: rgba(237, 186, 4, 0.931);
  margin-bottom: 10px;
}

textarea {
  width: 84%;
  height: 300px;
}

button {
  border-radius: 8px;
  color: rgba(243, 8, 133, 0.931);
  padding: 10px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin-left: 59%;
}

button:hover{
  background-color: rgba(66, 5, 249, 0.931);
  color:rgb(239, 67, 67);
  cursor: pointer;
}

.margin-customized {
  margin-top: 10px;
  color: rgba(237, 186, 4, 0.931);
  font-size: 18px;
}

.error-style {
  font-size: 18px;
  margin-top: 10px;
  color: rgba(242, 85, 169, 0.931);
}

.number-color{
  color: rgba(249, 4, 135, 0.931);
  background-color: rgba(237, 234, 244, 0.931);
  padding:6px 26px;
  border-radius: 5px;
}
</style>
