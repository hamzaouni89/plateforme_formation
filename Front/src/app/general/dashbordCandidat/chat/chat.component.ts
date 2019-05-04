import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  Users;
  token :any;
  fakePath : any;
  allUser: any = [];
  allUserMessage: any = [];
  privateMessage: any;
  schemaMessage: any;
  userMessage: any;
  messageSend: FormGroup;
  u;
  constructor(
    private chatService: ChatService,
    private userService: UserService,) {
      this.messageSend = new FormGroup({
        contenu: new FormControl('', [Validators.required, Validators.minLength(1)]),
      });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.Users = users ;
    });
    this.token = this.userService.getDecodedToken();
    this.getConversation()
    this.getprivateMessageSocket()
 
  

  }
  getCandidatById(id){
    this.userService.getCandidatById(id).subscribe(res => {
      this.u = res ;
    });
  }
  
  getConversation() {
    this.chatService.getConversation(this.token.candidat).subscribe(res => {
      this.allUser = res;
      for (let i = 0; i < this.allUser.length; i++) {
        this.userService.getCandidatById(this.allUser[i]).subscribe(data => {
          this.allUserMessage.push(data);
        });
      }
    });
  }
  getprivateMessageSocket(){
    this.chatService.getprivateMessageSocket().subscribe((data: any) => {
      this.privateMessage = data;
    });
  }
     
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  sendMessage(f) {   
      this.schemaMessage = {
        user1 : this.token.candidat,
        user2 : f,
        messages : [{
          contenu : this.messageSend.value.contenu,
          date : Date.now(),
          from : this.token.candidat,
          to: f
        }]
      };
      this.chatService.sendMessage(this.schemaMessage).subscribe(res => {
        this.findConversation(f);
        this.messageSend.controls.contenu.setValue(''); 
        this.getprivateMessageSocket();
      });
    }
 
  findConversation(f) {
    this.chatService.getPrivateConvertion(this.token.candidat, f).subscribe(res => {
    this.privateMessage = res;
  });
  }

  getUserMessage(f) {
    this.userService.getCandidatById(f).subscribe(res => {
      this.userMessage = res;
    });
  }
  
}

