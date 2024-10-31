<template>
  <div>
    <h2>Personas</h2>
    <form @submit.prevent="editMode ? confirmEdit() : addPersona()"> 
    <input 
        v-model="personaLocal.param1" 
        placeholder="Nombre"
        required
      />
      
      <input 
        v-model="personaLocal.param2" 
        placeholder="Fecha de Nacimiento" 
        required 
      />
      
      <button 
        type="submit"
      >
        {{ editMode ? "Guardar Cambios" : "Agregar Persona" }}
      </button>
    </form><br>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      persona: {
        type: Object,
        required: true
      },
      editMode: {
        type: Boolean,
        required: true
      }
    },

    data() {
      return {
        personaLocal: { ...this.persona },
      };
    },

    methods:{
      //POST
      async addPersona() {
        if (confirm('¿Estás seguro de agregar esta persona?')) {
          try {
            const nuevaPersona ={
              param1: this.personaLocal.param1,
              param2: this.personaLocal.param2,
            }

            const response = await axios.post('https://api.yumserver.com/15862/generic/personas', nuevaPersona);
            
            this.$emit("fetch-personas");
            
            this.resetForm();
          } catch (error) {
            console.log(error);
          }
        }
      },

      //PATCH AXIOS
      async confirmEdit() {
        if (confirm('¿Estás seguro de editar esta persona?')) {
          try {
            let response = await axios.patch('https://api.yumserver.com/15862/generic/personas', this.personaLocal);
            console.log("Persona actualizada:", response.data);
            
            this.$emit("fetch-personas");

            this.resetForm();
            this.$emit("edit-mode", false); 
          } catch (error) {
            console.log(error);
          }
        }
      },
      
      resetForm() {
        this.personaLocal = { idcod: null, nombre: '', fechaNacimiento: '' };
        this.$emit("edit-mode", false); 
      },
    },

    watch: { // Sincroniza personaLocal con persona actualizada
      persona: {
        handler(newVal) {
          this.personaLocal = { ...newVal };
        },
      }
    },

  }
</script>

<style scoped>

</style>