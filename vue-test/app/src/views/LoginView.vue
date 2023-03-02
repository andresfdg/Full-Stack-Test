<template>
  <div class="container-main">
    <div class="container1">
      <form @submit.prevent="login" class="block1">
        <div class="form">
          <span class="btt">DIVEX</span>
          <input
            v-model="data.email"
            type="text"
            name=""
            id=""
            placeholder="email"
          />
          <input type="password" name="" id="" placeholder="password" />
          <button><span class="bts"> Login </span></button>
          <span v-if="data.span" class="span">email/password wrong</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../stores/counter";

const store = useStore();

const data = reactive({
  span: false,
  email: "",
});

const router = useRouter();

//the login function allows us to obtain our token and then redirect us to our currency converter

const login = async () => {
  let datalogin = {
    email: data.email,
  };
  const res = await fetch(`http://127.0.0.1:3000/login`, {
    method: "POST",
    body: JSON.stringify({ email: data.email }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  const da = await res.json();

  if (da == "fail") {
    data.span = true;
    setTimeout(() => {
      data.span = false;
    }, 2000);
  } else {

  //our token is stored in localstorage and then retrieved by our state handler 
     
    localStorage.setItem("token", da.accessToken);
    store.auth = da.accessToken;
    router.push("/convertion");
  }

  console.log(da);
};
</script>

<style scoped>
.container-main {
  height: 100vh;
  background-image: url("../../src/img/background.png");
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  text-align: center;
  padding: 50px;
  border-radius: 15px;
}

form input {
  margin: 10px;
  border-radius: 8px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 4px;
}

form button {
  border-radius: 8px;
  margin: 10px;
  border: none;
  padding: 4px;
  background-color: #36bbd9;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.bts {
  color: #f5f5f5;
  font-size: 20px;
  font-weight: bold;
}

.btt {
  color: #36bbd9;
  font-size: 25px;
  font-weight: bold;
}

form button:hover {
  background-color: #237587;
}

.span {
  color: red;
  font-weight: bold;
}
</style>
