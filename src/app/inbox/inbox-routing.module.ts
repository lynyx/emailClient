import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailPlaceholderComponent } from "./email-placeholder/email-placeholder.component";
import { EmailShowComponent } from "./email-show/email-show.component";
import { InboxHomeComponent } from "./inbox-home/inbox-home.component";
import { EmailResolver } from './email-resolver';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: InboxHomeComponent,
    children: [
      { path: 'not-found', component: NotFoundComponent },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: {
          email: EmailResolver,
        }
      },
      { path: '', component: EmailPlaceholderComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule {
}
