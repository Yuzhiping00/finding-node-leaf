<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
    <p>Multiline message is:</p>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
    <button style="color: brown;" @click="submitContent">Submit</button>
    <9>Total</9>
</template>

<style scoped>
 p{
  font-size: 20px;
  color:blueviolet;
 }

 textarea{
  width: 800px;
  height:400px;
 }
</style>
