import { Action, Module } from 'vuex-class-modules';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';

interface NotificationsState {
  notification: string | null;
}

// interface/class merging is needed here to avoid duplicate type annotations during class declaration
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotificationsModule extends NotificationsState {}

@Module({ generateMutationSetters: true })
class NotificationsModule extends ExtendedVuexModule<NotificationsState> {
  @Action
  addNotification(text: string): void {
    this.notification = text;
    window.setTimeout(() => {
      this.notification = null;
    }, 10000);
  }
}

const notificationsModule = new NotificationsModule({
  state: {
    notification: null,
  },
  store,
  name: 'notifications',
});

export default notificationsModule;
