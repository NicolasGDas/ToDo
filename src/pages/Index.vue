<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input placeholder="Buscar..." v-model="filter" label="Buscar tarea:"/>
  <q-editor v-if="!this.modoEdicion"
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork,
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['save']
      ]"
    />
    <q-editor v-else
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Actualizar task',
          icon: 'save',
          label: 'Actualizar',
          handler: updateWork,
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['save']
      ]"
    />
    <q-btn  push color="white" text-color = "red-6" icon="delete" label = "Delete all" @click="delete_all()"
    size = "10px"/>
    <q-card class="row justify-between"
    flat bordered v-for="(item,index) in arrayFiltrado" :key="index">
      <q-card-section class ="col justify-between" v-html="item.texto" />
      <q-btn  push color="white" text-color = "green-4" icon="edit" @click="modify(index,item.id)"
        size = "10px"/>
      <q-btn  push color="white" text-color = "blue-4"  icon= "check"
      @click="finalizar_tarea(index,item.id)" size = "10px"/>
      <q-btn  push color="white" text-color = "red-4"  icon= "delete"
        @click="deletear(index,item.id)" size = "10px"/>
    </q-card>
    <div class="flex flex-center" v-if="tasks.length == 0">
      <h6>Sin tareas mi rey</h6>
    </div>
  </div>
</template>

<script>
import { db, firebase } from 'boot/firebase';

export default {
  // name: 'PageIndex',
  data() {
    return {
      editor: '',
      tasks: [],
      index: null,
      modoEdicion: false,
      id: null,
      texto: '',
      arrayFiltrado:[],
    };
  },
  computed:{
    filter:{
      get(){
        return this.texto;
      },
      set(value){
        value = value.toLowerCase();

        this.texto = value;
        this.arrayFiltrado = this.tasks.filter(
          item => item.texto.toLowerCase().indexOf(value) !== -1
          );
      }
    }
  },
  created(){
    this.listarTareas();
    this.arrayFiltrado = this.tasks;
  },
  methods: {
    async listarTareas() {
      try {
        const resDB = await db.collection('Pending_tasks').get();
        resDB.forEach(res => {
          const tasks_aux = {
            id:res.id,
            texto: res.data().texto,
            estado : res.data().estado
            };
            console.log(tasks_aux);
          this.tasks.push(tasks_aux);
        });
      } catch (error) {
        console.log(error);
      }
    },

    async updateWork() {
      try {
        
        //modificacion db
        const resDB = await db.collection('Pending_tasks').doc(this.id).update({
          texto: this.editor
        });
        // modificacion interna
        this.tasks[this.index].texto = this.editor;
        this.$q.notify({
          message: 'Task modify',
          color: 'black',
          textColor: 'white',
          icon: 'cloud_done',
        });
      } catch (error) {
          console.log(error);
      } finally {
        this.modoEdicion = false;
        this.index = null;
        this.id = null;
        this.editor = '';
        
      }
    },

    async saveWork() {
      try {
        if (this.editor !== '') {
          
          this.$q.notify({
            message: 'Task added',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
        });
        //guardado en la bd
        const resDB = await db.collection('Pending_tasks').add({
          texto: this.editor,
          estado: false,
        });
        //Agregado dentro de mi app
        this.tasks.push({
          texto: this.editor,
          estado: false,
          id: resDB.id
        });
      } else {
        this.$q.notify({
          message: 'Plz write a task',
          color: 'red',
          textColor: 'white',
          icon: 'warning',
        });
      }

        } catch(error) {
          console.log(error);
        }

      this.editor = '';
    },

    modify(index, id) {
      this.$q.dialog({
        title: 'Perro!',
        message: 'Estas por modificar la tarea ¿Estas seguro?',
        cancel: 'Gracias por avisar',
        ok: 'Si mi rey',
        persistent: true,
      }).onOk(() => {
        this.modoEdicion = true;
        this.index = index;
        this.id = id;
        this.editor = this.tasks[index].texto;
      });
    },

    async deletear(index,id) {
      this.$q.dialog({
        title: 'PARA REY!',
        message: 'Estas por borrar ¿Estas seguro?',
        cancel: 'NOOOO tenes razon, graciela',
        ok: 'Si mi rey',
        persistent: true,
      }).onOk(async () => {
        try{
          this.tasks.splice(index, 1);
          db.collection('Pending_tasks').doc(id).delete();
        }catch(error){
          console.log(error);
        }
      });
    },

    async finalizar_tarea(index,id){
      this.$q.dialog({
        title: 'PARA REY!',
        message: 'Seguro que terminaste la tarea rey?',
        cancel: 'Tenes razon,no termine',
        ok: 'Si mi rey',
        persistent: true,
      }).onOk(async () => {
        try {
          const task_completed = await db.collection('Pending_tasks').doc(id);
          const datos = await task_completed.get();
          const resDB = await db.collection('User').doc("User");
          await resDB.update({
                completed_tasks: firebase.firestore.FieldValue.arrayUnion(datos.data())
              });
          db.collection('Pending_tasks').doc(id).delete();
          this.tasks.splice(index, 1);
          this.$q.notify({
            message: 'Task completed!',
            color: 'blue-3',
            textColor: 'white',
            icon: 'cloud_done',
          });
        } catch (error) {
          console.log(error);
        }

      });
    },

    delete_all(){
      this.$q.dialog({
        title: 'PARA REY!',
        message: 'Estas por eliminar TODAS las tareas, No tiene vuelta atras. ¿Estas seguro?',
        cancel: 'Uf gracias por avisar',
        ok: 'Si mi rey, no me importa',
        persistent: true,
      }).onOk(async() => {
        try{
          
          const task_completed = await db.collection('Pending_tasks').get();
          task_completed.forEach(async task => {
            //console.log(task.id);
            this.tasks.splice(task.id, 1);
            await db.collection('Pending_tasks').doc(task.id).delete();
          });
          
        }catch(error){
          console.log(error);
        }
      });
    
    }

  },

};
</script>
