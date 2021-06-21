<template>
    <div class="q-pa-md q-gutter-sm">
        <q-input placeholder="Buscar..." v-model="filter" label="Buscar tarea:"/>
        <q-avatar size="100px" class="q-mb-sm">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
        <h3>The king of kings </h3>
        <h5>(@elpibardo)</h5>
        <h4>Tus tareas realizads:</h4>
        <q-card class="row justify-between"
        flat bordered v-for="(item,index) in arrayFiltrado" :key="index">
            <q-card-section class ="col justify-between" v-html="item.texto" />
            <q-btn  push color="white" text-color = "green-4" icon="edit" @click="modify(index,item.id)"
            size = "10px"/>
        </q-card>
        <div class="flex flex-center" v-if="tasks.length == 0">
        <h6>No hiciste ninguna tarea mi rey :o</h6>
    </div>
    </div>
</template>

<script>
import { db, firebase } from 'boot/firebase';


export default ({
    data() {
        return {
            tasks: [],
            texto: '',
            arrayFiltrado:[],
            id: null,
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
    methods:{
        async listarTareas() {
            try {
                let i = 0;
                const resDB = await db.collection('User').doc("User");
                const data = (await resDB.get()).data();
                data.completed_tasks.forEach(task_completed => {
                    const tasks_aux = {
                        id: i,
                        texto: task_completed.texto,
                        estado : task_completed.estado
                    };
                    i = i + 1;
                    //console.log(tasks_aux);
                    this.tasks.push(tasks_aux);
                });
            } catch (error) {
                console.log(error);
            }
        },
        modify(index, id) {
            this.$q.dialog({
            title: 'Eu amigo!',
            message: 'Estas por volver a mandar a esta tarea a ToDo. ¿Estas seguro?',
            cancel: 'No tenes razon',
            ok: 'Si, no la termine',
            persistent: true,
            }).onOk(async () => {
                try {
                    console.log(id);
                    const resDB = await db.collection('User').doc("User");
                    const data =  await resDB.get(id);                    
                    // data.data().completed_tasks[id];
                    console.log(data.data());
                    await db.collection('Pending_tasks').add({
                        texto: data.data().completed_tasks[id].texto,
                        estado: data.data().completed_tasks[id].estado,
                    });
                    await resDB.update({
                        completed_tasks: firebase.firestore.FieldValue.arrayRemove(data.data().completed_tasks[id])
                    });
                    this.tasks.splice(index, 1);
                    this.$q.notify({
                        message: 'Task re-scheduled!',
                        color: 'blue-3',
                        textColor: 'white',
                        icon: 'cloud_done',
                    });
                    } catch (error) {
                        console.log(error);
                    }
            });
        },


    }
});
</script>
