<template>
  <div v-if="currentPage == 'login'">
    <form onsubmit="return false">
      <label>
        username
        <input v-model="username" />
      </label>
      <label>
        password
        <input v-model="password" type="password" />
      </label>
      <button @click="submitLogin()">login</button>
      <p v-if="loading">logging in...</p>
      <p v-if="error">Failed to login</p>
      <button @click="navigateTo('register')">Register account</button>
    </form>
  </div>
  <div v-else-if="currentPage == 'register'">
    <form onsubmit="return false">
      <label>
        username
        <input v-model="username" />
      </label>
      <label>
        studentId
        <input v-model="studentId" />
      </label>
      <label>
        password
        <input v-model="password" type="password" />
      </label>
      <label>
        confirm password
        <input v-model="confirmPassword" type="password" />
      </label>
      <button @click="submitRegister()">register</button>
      <p v-if="loading">registering...</p>
      <p v-if="error">Failed to login</p>
      <button @click="navigateTo('login')">Back to login</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      default: 'login',
    },
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      studentId: "",

      loading: false,
      error: false,

      currentPage: "login",
    };
  },
  created() {
    this.currentPage = this.page;
  },
  methods: {
    async submitLogin() {
      if (this.loading) return;

      this.loading = true;
      this.error = false;

      try {
        const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: this.username.trim(),
            password: this.password.trim()
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await res.json();
        if (!data.status) {
          throw new Error("failed to login");
        }

        window.reload();

        this.loading = false;
        this.error = false;
      } catch (err) {
        console.error("failed to login", err);

        this.loading = false;
        this.error = true;

        return;
      }
    },
    async submitRegister() {
      if (this.loading) return;

      this.loading = true;
      this.error = false;

      try {
        const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/auth/register`, {
          method: 'POST',
          body: JSON.stringify({
            username: this.username.trim(),
            password: this.password.trim(),
            studentId: this.studentId.trim()
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (!data.status) {
          throw new Error("failed to register");
        }

        window.reload();

        this.loading = false;
        this.error = false;
      } catch (err) {
        console.error("failed to register", err);
        this.loading = false;
        this.error = true;
        return;
      }
    },
    navigateTo(to) {
      if (this.loading) return;

      this.error = false;
      this.loading = false;
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.studentId = '';
      this.currentPage = to;
    }
  },
};
</script>