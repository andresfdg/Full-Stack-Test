<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"> <span>DIVEX</span> </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul
            class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll"
            style="--bs-scroll-height: 100px"
          >
            <li class="nav-item" v-if="store.auth">
              <router-link
                to="/convertion"
                class="nav-link active"
                aria-current="page"
              >
                <span class="btnv">Convertion</span>
              </router-link>
            </li>
            <li class="nav-item" v-if="store.auth">
              <router-link to="/comparation" class="nav-link active">
                <span class="btnv">Comparation </span>
              </router-link>
            </li>
            <li class="nav-item" v-if="store.auth">
              <router-link to="/" class="nav-link active">
                <button @click="logout" class="log">logout</button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useStore } from "../stores/counter";
import { useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/");
  store.auth = false;
};

const store = useStore();
</script>

<style scoped>
.navbar {
  background-color: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.btnv {
  color: #36bbd9;
  font-weight: bold;
}

.btnv:hover {
  color: #227689;
}

.log {
  background-color: #227689;
  color: #f5f5f5;
  border-radius: 8px;
  padding: 3px;
  font-weight: bold;
}

.log:hover {
  background-color: red;
}
span {
  font-weight: bold;
  font-size: 18px;
}
</style>
