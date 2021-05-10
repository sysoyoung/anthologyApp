import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { ListComponent } from './main/list/list.component';
import { PageComponent } from './main/list/page/page.component';
import { ListItemComponent } from './main/list/list-item/list-item.component';
import { SearchService } from './search.service';
import { PageService } from './main/list/page/page.service';
import { TextComponent } from './main/list/page/text/text.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationService } from './registration/registration.service';
import { IsLoggedIn } from './isLoggedIn.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { MyArticleComponent } from './dashboard/my-article/my-article.component';
import { ArticleCreationComponent } from './article-creation/article-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ListComponent,
    PageComponent,
    ListItemComponent,
    TextComponent,
    RegistrationComponent,
    AuthComponent,
    DashboardComponent,
    MyArticleComponent,
    ArticleCreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['http://localhost:3000/account/auth', 'http://localhost:3000/account/reg'],
      }
    }),
  ],
  providers: [ SearchService, PageService, RegistrationService, IsLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
