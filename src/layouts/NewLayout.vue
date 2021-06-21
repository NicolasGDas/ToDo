<template>
    <div class="q-pa-md">
<q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-cyan-8">
        <q-toolbar>
            <q-toolbar-title>ToDo App</q-toolbar-title>
            <q-toggle
        v-model="third"
        checked-icon="nightlight_round"
        color="grey"
        unchecked-icon="light_mode"
        @input="nightMode()"

        />
            <div>Menu</div>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
    </q-header>


        <q-drawer
            v-model="drawer"
            show-if-above
            :width="200"
            :breakpoint="400"
        >
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item clickable v-ripple
                    to='/' replace>
                    <q-item-section avatar>
                        <q-icon name= "home" />
                    </q-item-section>

                    <q-item-section>
                        Inicio
                    </q-item-section>
                    </q-item>

                    <q-item active clickable v-ripple
                    to='/User' replace>
                    <q-item-section avatar>
                        <q-avatar size="56px" class="q-mb-sm">
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        My profile
                    </q-item-section>
                    </q-item>
                    
                    <q-item clickable v-ripple
                    to='/Tasks' replace>
                    <q-item-section avatar>
                        <q-icon name="schedule" />
                    </q-item-section>

                    <q-item-section>
                        Tasks
                    </q-item-section>
                    </q-item>




                </q-list>
            </q-scroll-area>

            <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
                <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <div class="text-weight-bold">The king of kings</div>
                <div>@elpibardo</div>
            </div>
            </q-img>

        </q-drawer>

        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
    </div>
</template>

<script>
export default {
    data () {
        return {
        drawer: false,
        third: false
        };
    },
    methods:{
        nightMode(){
            this.$q.dark.toggle();
        }
    }
};
</script>