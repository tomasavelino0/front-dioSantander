import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { TransacaoComponent } from './components/transacao/transacao.component';

const routes: Routes = [
    { path: '', component: UsersComponent, pathMatch: 'full' },
    { path: 'transaction', component: TransacaoComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
