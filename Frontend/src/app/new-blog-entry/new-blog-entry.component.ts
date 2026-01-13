import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { AuthService } from '../../../services/connect.services/auth.service';

@Component({
  selector: 'app-new-blog-entry',
  imports: [FormsModule],
  templateUrl: './new-blog-entry.component.html',
  styleUrl: './new-blog-entry.component.css',
})
export class NewBlogEntryComponent {
  constructor(
    private connectService: ConnectService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe((user) => {
      if (user?.username) {
        this.username.set(user.username);
      }
    });
  }

  title = signal('');
  img = signal('');
  content = signal('');
  username = signal('');
  likes = signal('');
  date = signal('');

  titleChange($event: any) {
    this.title.set($event);
  }

  imgChange($event: any) {
    this.img.set($event);
  }

  contentChange($event: any) {
    this.content.set($event);
  }

  usernameChange($event: any) {
    this.username.set($event);
  }

  likesChange($event: any) {
    this.likes.set($event);
  }

  dateChange($event: any) {
    this.date.set($event);
  }

  async onSubmit() {
    const currentDate = new Date().toLocaleDateString('es-ES'); // Extrae la fecha actual en la que se publica la entrada

    const blogEntry = {
      title: this.title(),
      img: this.img(),
      content: this.content(),
      username: this.username(), // Use the signal value
      likes: this.likes() || '0',
      date: this.date() || currentDate,
    };
    console.log('Blog entry submitted', blogEntry);
    await this.connectService.newBlogEntry(blogEntry);
    this.router.navigate(['/blog']);
  }
}
