<template>
  <div class="persona-detalle">
    <h2>Detalles de la Empresa</h2>
    
    <div 
      v-if="persona && persona.idcod !== null"
      class="persona-info"
    >
      <p><strong>Nombre:</strong> {{ persona.param1 }}</p>
      <p><strong>Fecha de Nacimiento:</strong> {{ persona.param2 }}</p>
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
  name: "PersonaDetalleView",

  props: {
    id: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      persona: {
        idcod: null,
        param1: "",
        param2: ""
      },
    };
  },

  methods: {
    async fetchPersona() {
      try {
        const response = await axios.get(`https://api.yumserver.com/15862/generic/personas/${this.id}`);
        this.persona = response.data;

      } catch (error) {
        console.error('Error al cargar la persona:', error);
      }
    },

    volver() {
      this.$router.push('/personas');
    }
  },

  mounted() {
    this.fetchPersona();
  },
};
</script>

<style scoped>
.persona-detalle {
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

.persona-info p {
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