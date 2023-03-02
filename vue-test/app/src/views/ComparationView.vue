<template>
  <div class="container3">
    <br />

    <h1>Comparation</h1>
    <h5>Compare the value of your favorite currencies!</h5>
    <div class="row">
      <div class="col">
        <select class="form-select" v-model="data.select_1" name="" id="">
          <option v-for="i in data.select1" :key="i">{{ i }}</option>
        </select>
      </div>
      <div class="col">
        <select class="form-select" v-model="data.select_2" name="" id="">
          <option v-for="i in data.select1" :key="i">{{ i }}</option>
        </select>
      </div>
      <div class="col">
        <select class="form-select" v-model="data.select_3" name="" id="">
          <option v-for="i in data.select1" :key="i">{{ i }}</option>
        </select>
      </div>
      <div class="col">
        <select class="form-select" v-model="data.select_4" name="" id="">
          <option v-for="i in data.select1" :key="i">{{ i }}</option>
        </select>
      </div>
      <div class="col">
        <select class="form-select" v-model="data.select_5" name="" id="">
          <option v-for="i in data.select1" :key="i">{{ i }}</option>
        </select>
      </div>
    </div>

    <button class="btn ctv" @click="convertion_data">Convert</button>
    <div class="list_c" v-if="data.activate">
      <h3>{{ data.select_1 }}={{ data.value1 }}$</h3>
      <h3>{{ data.select_2 }}={{ data.value2 }}$</h3>
      <h3>{{ data.select_3 }}={{ data.value3 }}$</h3>
      <h3>{{ data.select_4 }}={{ data.value4 }}$</h3>
      <h3>{{ data.select_5 }}={{ data.value5 }}$</h3>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";

const id = "0f69e28b8e5a4b28bb4da24caeb28c31";

const data = reactive({

  activate:false,  
     
  select_1: "",
  select_2: "",
  select_3: "",
  select_4: "",
  select_5: "",

  value1: "",
  value2: "",
  value3: "",
  value4: "",
  value5: "",

  select1: {},
  completed: {},
});

const getall = async () => {
  const res = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${id}`
  );

  const da = await res.json();
  data.completed = da.rates;
  data.select1 = Object.keys(da.rates);
};

const convertion_data = () => {
  let dolar_base = 0;
  for (let i in data.select1) {
    if (data.select1[i] == data.select_input) {
      dolar_base = data.completed[data.select1[i]];
    }
  }

  let step = 0;

  step = data.select_quantity / dolar_base;
  for (let i in data.select1) {
    if (data.select1[i] == data.select_1) {
      console.log(data.select1[i]);
      let change = data.completed[data.select1[i]];
      data.value1 = 1 / change;
    }
    if (data.select1[i] == data.select_2) {
      console.log(data.select1[i]);
      let change = data.completed[data.select1[i]];
      data.value2 = 1 / change;
    }
    if (data.select1[i] == data.select_3) {
      console.log(data.select1[i]);
      let change = data.completed[data.select1[i]];
      data.value3 = 1 / change;
    }
    if (data.select1[i] == data.select_4) {
      console.log(data.select1[i]);
      let change = data.completed[data.select1[i]];
      data.value4 = 1 / change;
    }
    if (data.select1[i] == data.select_5) {
      console.log(data.select1[i]);
      let change = data.completed[data.select1[i]];
      data.value5 = 1 / change;
    }
  }

  data.activate = true

  console.log(data.value1);
};

onMounted(() => {
  getall();
});
</script>

<style>
.container3 {
  display: flex;

  height: 100vh;
  align-items: center;
  flex-direction: column;
  background-color: #0e3659;
  color: aliceblue;
}

.ctv {
  background-color: #36bbd6;
  padding: 10px;
  color: #f0f0f0;
  font-weight: bold;
  border: 3px solid white;
  margin: 20px;
}

.list_c {
  background-color: #36bbd6;
  padding: 20px;
  border-radius: 15px;
  border: 3px solid white;
}
.list_c:hover{
    background-color: #2c92eb;
}
</style>
