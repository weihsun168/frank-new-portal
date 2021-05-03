<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome to System Verfication Platform 
          </h1>
          <h2 class="subtitle">
            Please log in before you access any page on this web
          </h2>
          <div class="button-block">
            <button v-if="!$auth.isAuthenticated" @click="login" class="button is-xl is-dark">Sign in to SVP</button>
            <h3 v-if="$auth.isAuthenticated" class="is-size-3 has-background-dark welcome">Welcome, {{ $auth.user.name }}!</h3>
          </div>
        </div>
      </div>
    </section>
    <EventList />
  </div>
</template>

<script>
import EventList from '@/components/EventList';
export default {
  name: 'home',
  components: {
    EventList
  }, 
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    }
  }
}
</script>

<style lang="scss" scoped>
  .hero {    
    text-align: center;
    background-image: url('https://i0.wp.com/geneonline.news/wp-content/uploads/2017/10/42338217_xxl-e1508918837904.jpg?ssl=1');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
  }
  .hero-body .title {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
    padding: 40px 0 20px 0;
    font-size: 60px;
  }
  .subtitle {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    bottom: -150px;
    .button {
      margin-right: 50px;
      padding-left: 50px;
      padding-right: 50px;
    }
    .welcome {
      width: 400px;
      padding: 10px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .is-xl {
    font-size: 1.7rem;
  }
</style>