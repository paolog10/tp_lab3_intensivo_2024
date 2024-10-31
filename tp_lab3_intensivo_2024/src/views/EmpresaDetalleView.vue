<template>
  <div class="empresa-detalle">
    <h2>Detalles de la Empresa</h2>
    
    <div 
      v-if="empresa && empresa.idcod !== null"
      class="empresa-info"
    >
      <p><strong>Nombre:</strong> {{ empresa.param1 }}</p>
      <p><strong>Fecha de Nacimiento:</strong> {{ empresa.param2 }}</p>
      <button 
        @click="volver"
        class="btn-volver"  
      >
        Volver
      </button>
    </div>
    
    <div 
      v-else
      class="cargando"  
    >
      <p>Cargando...</p>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "EmpresaDetalleView",

  props: {
    id: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      empresa: {
        idcod: null,
        param1: "",
        param2: ""
      },
    };
  },

  methods: {
    async fetchEmpresa() {
      try {
        const response = await axios.get(`https://api.yumserver.com/15862/generic/empresa/${this.id}`);
        this.empresa = response.data;

      } catch (error) {
        console.error('Error al cargar la empresa:', error);
      }
    },

    volver() {
      this.$router.push('/empresas');
    }
  },

  mounted() {
    this.fetchEmpresa();
  },
};
</script>

<style scoped>
.empresa-detalle {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  color: #333;
}

.empresa-info p {
  margin: 10px 0;
  font-size: 16px;
  color: #555;
}

.btn-volver {
  display: inline-block;
  padding: 8px 16px;
  margin-top: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-volver:hover {
  background-color: #0056b3;
}

.cargando {
  text-align: center;
  font-size: 18px;
  color: #888;
}
</style>

