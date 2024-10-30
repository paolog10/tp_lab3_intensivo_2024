<template>
  <div id="app">
    <header>
      <h1>Administración de Empresas</h1>
      <!-- <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/admin">Administración</router-link>
      </nav> -->
    </header>

    <main>
      <section>

        <h2>Empresas</h2>
        <form @submit.prevent="addEmpresa">
          <input 
            v-model="empresa.nombre" 
            placeholder="Nombre de la empresa"
            required
          />
          
          <input 
            v-model="empresa.categoria" 
            placeholder="Categoría de la empresa" 
            required 
          />
          
          <button 
            type="submit"
          >
            Agregar Empresa
          </button>
        </form><br>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(emp) in empresas" :key="emp.idcod">
              <td>{{ emp.param1 }}</td>
              <td>{{ emp.param2 }}</td>
              <td>
                <button @click="editEmpresa(emp)">Editar</button>
                <button @click="confirmDeleteEmpresa(emp.idcod)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <footer>
      <p>&copy; 2024 Administrador de Empresas</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      empresas: [],
      empresa: { nombre: '', categoria: '' },
    };
  },
  methods: {
    //GET
    async fetchEmpresas() {
      try {
        const response = await axios.get('https://api.yumserver.com/15862/generic/empresa')
        this.empresas = [...response.data]
      } catch (error) {
        console.log(error);
      }
    },

    //POST
    async addEmpresa() {
      try {
        const nuevaEmpresa ={
          param1: this.empresa.nombre,
          param2: this.empresa.categoria,
        }

        const response = await axios.post('https://api.yumserver.com/15862/generic/empresa', nuevaEmpresa);
        
        this.empresa.nombre = "";
        this.empresa.categoria = "";
        await this.fetchEmpresas();
      } catch (error) {
        console.log(error);
      }
    },

    // //PATCH AXIOS
    // async editEmpresa(empresa) {
    //   try {
    //     const empresaEditada = {
    //       idcod: empresa.idcod,
    //       param1: empresa.param1,  //nombre 
    //       param2: empresa.param2   //categoria 
    //     };
    //     console.log("empresaEditada", empresaEditada)

    //     const response = await axios.patch('https://api.yumserver.com/15862/generic/empresa', empresaEditada);
        
    //     await this.fetchEmpresas();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    //PATCH FETCH
    async editEmpresa(empresa) {
      try {
        const empresaEditada = {
          idcod: empresa.idcod,
          param1: empresa.param1, 
          param2: empresa.param2  
        };
        console.log("empresaEditada", empresaEditada);

        const response = await fetch('/api/empresa', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(empresaEditada),
        });

        // if (!response.ok) {
        //   throw new Error(`Error: ${response.status}`); 
        // }
        console.log(response);

        this.empresa.nombre = "";
        this.empresa.categoria = "";

        await this.fetchEmpresas(); 
      } catch (error) {
        console.log(error);
      }
    },

    //DELETE
    confirmDeleteEmpresa(id) {
      if (confirm('¿Estás seguro de eliminar esta empresa?')) {
        this.deleteEmpresa(id);
      }
    },
    async deleteEmpresa(_idcod) {
      try {
        const idcodEmpresa = {
          idcod: _idcod,
        };

        const response = await axios.delete('https://api.yumserver.com/15862/generic/empresa', {
          data: idcodEmpresa //incorporar un data como cuerpo del delete
        });

        await this.fetchEmpresas();
      } catch (error) {
        console.log(error);
      }
    },

  },

  async mounted() {
    await this.fetchEmpresas();
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header,
footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
}

header nav a,
footer a {
  color: white;
  margin: 0 10px;
}

main {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
