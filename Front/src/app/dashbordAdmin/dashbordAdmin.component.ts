import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-dashbordAdmin',
  templateUrl: './dashbordAdmin.component.html',
  styleUrls: ['./dashbordAdmin.component.css']
})
export class DashbordAdminComponent implements OnInit {
  http: Http;
  Coachs: any;
  constructor(private userService: UserService) { }

  ngOnInit() {

  }





}
