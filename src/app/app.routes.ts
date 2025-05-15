import { Routes } from '@angular/router';
import { MemeListComponent } from './components/meme-list/meme-list.component';

export const routes: Routes = [
    {
        path: '',
        component: MemeListComponent
    },
    {
        path: 'random',
        component: MemeListComponent
    }
];
