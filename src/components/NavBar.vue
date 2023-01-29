<template>
<nav class="navbar navbar-expand-lg" style="background-color: #e3f2fd;">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/home">
      <img src="https://cdn.acwing.com/media/article/image/2022/07/07/1_d7f3b93efd-kob.png" alt="" width="35" height="35">
      Smashee
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/home">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/matchmaking">Matchmaking</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/matches">Matches</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/ranking">Ranking</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <ul class="navbar-nav" v-if="$store.state.user.is_login">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="$store.state.user.avatar" alt="" width="35" height="35">
            {{ $store.state.user.usrname }}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">My smashees</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="logout">Log out</a></li>
          </ul>
        </li>
      </ul>
      <ul class="navbar-nav" v-else>
        <li><router-link :to="{name: 'Login' }" class="nav-link" href="#" role="button">Login</router-link></li>
        <li><router-link :to="{name: 'Register'}" class="nav-link" href="#" role="button">Register</router-link></li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore()

    const logout = () => {
      store.dispatch("logout")
    }

    return {
      logout
    }
  }

}
</script>

<style scoped>
</style>