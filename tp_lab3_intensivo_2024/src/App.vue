<template>
  <div>
    <nav class="nav-bar">
      <router-link to="/personas" class="nav-link">Personas</router-link>
      |
      <router-link to="/empresas" class="nav-link">Empresas</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.nav-bar {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.nav-link {
  color: #007bff;
  text-decoration: none;
  margin: 0 5px;
}

.nav-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
