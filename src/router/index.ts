import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import TournamentsOverview from '@/views/TournamentsOverview.vue';
import TournamentDetails from '@/views/TournamentDetails.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tournaments',
    name: 'TournamentsOverview',
    component: TournamentsOverview,
  },
  {
    path: '/tournaments/:id',
    name: 'TournamentDetails',
    component: TournamentDetails,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
