import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imported Components
import { NavigationComponent } from './navigation/navigation.component';
import { AppComponent } from './app.component';

// Services
import { PostService } from './post-service/post.service';

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
