  <template>  
    <div>
      <header>
        <h1>Administración de Personas</h1>
      </header>

      <main>
        <section>

          <h2>Personas</h2>
            <form @submit.prevent="editMode ? confirmEdit() : addPersona()">
            <input 
              v-model="persona.param1" 
              placeholder="Nombre"
              required
            />
            
            <input 
              v-model="persona.param2" 
              placeholder="Fecha de Nacimiento" 
              required 
            />
            
            <button 
              type="submit"
            >
              {{ editMode ? "Guardar Cambios" : "Agregar Persona" }}
            </button>
          </form><br>

          <p v-if="personas.length === 0">No hay personas.</p>

          <table v-else>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha de Nacimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(persona) in personas" :key="persona.idcod">
                <td>{{ persona.param1 }}</td>
                <td>{{ persona.param2 }}</td>
                <td>
                  <button @click="verPersona(persona)">Ver</button>
                  <button @click="editPersona(persona)">Editar</button>
                  <button @click="confirmDelete(persona.idcod)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      <footer>
      <p>&copy; 2024 Laboratorio 3</p>
    </footer>

    </div>
  </template>

  <script>
  import axios from 'axios'
    export default {
      data(){
        return {
          personas: [],
          persona: {
            idcod: null,
            param1: "",
            param2: ""
          },
          editMode: false,
        }
      },

      methods:{
        //GET
        async fetchPersonas() {
          try {
            const response = await axios.get('https://api.yumserver.com/15862/generic/personas')
            this.personas = [...response.data]
          } catch (error) {
            console.log(error);
          }
        },

        //POST
        async addPersona() {
          try {
            const nuevaPersona ={
              param1: this.persona.param1,
              param2: this.persona.param2,
            }

            const response = await axios.post('https://api.yumserver.com/15862/generic/personas', nuevaPersona);

            this.resetForm();
            
            await this.fetchPersonas();
          } catch (error) {
            console.log(error);
          }
        },

        //DELETE
        confirmDelete(id){
          if (confirm('¿Estás seguro de eliminar esta empresa?')) {
            this.deletePersona(id);
          }
        },
        async deletePersona(_idcod){
          try {
            const idcodPersona = {
              idcod: _idcod,
            };

            const response = await axios.delete('https://api.yumserver.com/15862/generic/personas', {
              data: idcodPersona
            });

            await this.fetchPersonas();
          } catch (error) {
            console.log(error);
          }
        },

        //PATCH AXIOS
        editPersona(persona) {
          this.editMode = true;
          this.persona = {...persona}
        },
        async confirmEdit() {
          if (confirm('¿Estás seguro de editar esta persona?')) {
            try {
              console.log(this.persona)
              let response = await axios.patch('https://api.yumserver.com/15862/generic/personas', this.persona);
              console.log(response)
              this.resetForm();
              await this.fetchPersonas();
            } catch (error) {
              console.log(error);
            }
          }
        },

        resetForm() {
          this.persona = { idcod: null, nombre: '', fechaNacimiento: '' };
          this.editMode = false;
        },
      },



      async mounted() {
        await this.fetchPersonas();
      }
    }
  </script>

  <style scoped>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  header,
  footer {
    background-color: #007bff;
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