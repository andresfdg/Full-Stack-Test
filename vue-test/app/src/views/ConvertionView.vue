<template>
  <div class="container2">
    <br />
    <h1>Convertion</h1>
    <h5>Convert your currencies in a fast and fun way!</h5>
    <div class="row block mt-3">
      <div class="col-3">
        <div class="d-flex">
          <span class="span">From: </span>
          <select class="form-select" v-model="data.select_input" name="" id="">
            <option v-for="i in data.select1" :key="i">{{ i }}</option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <div class="d-flex">
          <span class="span">To: </span>
          <select
            class="form-select"
            v-model="data.select_output"
            name=""
            id=""
          >
            <option v-for="i in data.select1" :key="i">{{ i }}</option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <input
          class="form-control"
          type="text"
          v-model.number="data.select_quantity"
          placeholder="quantity"
        />
      </div>
      <div class="col-3">
        <input
          class="form-control"
          type="text"
          v-model="data.convertion"
          disabled="disabled"
        />
      </div>
    </div>

    <div class="row mt-3">
      <button class="btn ctv" @click="convertion_data">Convert</button>
    </div>

    <br />
    <br />
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";

const id = "0f69e28b8e5a4b28bb4da24caeb28c31";

const data = reactive({
  select_input: "",
  select_output: "",
  select_quantity: "",
  convertion: "",
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
  let final_base = 0;
  for (let i in data.select1) {
    if (data.select1[i] == data.select_output) {
      final_base = data.completed[data.select1[i]];
    }
  }

  let step = 0;

  step = data.select_quantity / dolar_base;

  data.convertion = step * final_base;

  
};

onMounted(() => {
  getall();
});
</script>

<style>
.container2 {
  display: flex;

  flex-direction: column;
  align-items: center;
  background-color: #0e3659;
  height: 100vh;
  color: aliceblue;
}

.ctv {
  background-color: #36bbd6;
  padding: 10px;
  color: #f0f0f0;
  font-weight: bold;
  border: 3px solid white;
}

.block {
  background-color: #f0f0f0;
  padding: 30px;
  border-radius: 15px;
}
.span {
  color: #0e3659;
  font-weight: bold;
  margin: 4px;
}
.form-control {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.form-select {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
